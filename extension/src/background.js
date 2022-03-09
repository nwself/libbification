import browser from "webextension-polyfill";

let db = {};

/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 *
 * Since there is only one registered command in this sample extension,
 * the returned `commandsArray` will look like the following:
 *    [{
 *       name: "toggle-feature",
 *       description: "Send a 'toggle-feature' event to the extension"
 *       shortcut: "Ctrl+Shift+U"
 *    }]
 */
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
    // Note that this logs to the Add-on Debugger's console: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
    // not the regular Web console.
    console.log(command);
  }
});

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * In this sample extension, there is only one registered command: "Ctrl+Shift+U".
 * On Mac, this command will automatically be converted to "Command+Shift+U".
 */
function sendSearchMessage(terms) {
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabArray) => {
      // wish I knew how to do this once per page
      browser.tabs.insertCSS({file: "build/injectionBundle.css"});

      // doing this to avoid doing anything on pages that don't trigger
      // the command
      browser.tabs.executeScript({
        file: "build/injectionBundle.js"
      }).then(() => {
        // now send it a message
        let tabId = tabArray[0].id;

        const args = {
          command: "lookup-title",
        };
        if (terms) {
          args.terms = terms;
        }
        browser.tabs.sendMessage(tabId, args);
      });

    });
}

function sendToggleOverlay() {
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabArray) => {
      let tabId = tabArray[0].id;
      browser.tabs.sendMessage(tabId, {
        command: "toggle-overlay"
      });
    });
}

browser.commands.onCommand.addListener((command) => {
  if (command === "toggle-overlay") {
    sendToggleOverlay();
  } else {
    sendSearchMessage();
  }
});

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: ", {request});
  // sendResponse({response: "Response from background script"});
  if (request.type === "search") {
    sendSearchMessage(request.terms);
  } else if (request.type === "dbUpdate") {
    db = request.db;
  } else if (request.type === "getDB") {
    sendResponse(db);
  }
}

browser.runtime.onMessage.addListener(handleMessage);
