(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const libraries = [
    "https://librarypoint.overdrive.com",
    "https://mrl.overdrive.com",
    "https://finditva.overdrive.com",
    "https://nnpls.overdrive.com",

    "https://chesapeake.overdrive.com",
    "https://rvl.overdrive.com",
    "https://princewilliam.overdrive.com",
    "https://brdc.overdrive.com",
    "https://swvapub.overdrive.com",
    "https://vppl.overdrive.com",
    "https://elprlibrary.overdrive.com",
    "https://yorkcountyva.overdrive.com",
  ];

  const cards = {
    "librarypoint": true,
    "mrl": true,
    "finditva": true,
    "nnpls": true,
  };

  function format(library) {
    if (library in cards) {
      return "__" + library + "__";
    }
    return library;
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "lookup-title") {
      var selectedText = window.getSelection().toString().trim();

      if (selectedText) {
        for (const basePath of libraries) {
          const library = basePath.substring(8, basePath.indexOf("."));
          console.log(`Look for ${selectedText} at ${format(library)}`)
          let myRequest = new Request(`${basePath}/search?query=${selectedText.replaceAll(" ", "+")}&format=ebook-overdrive&sortBy=relevance`);

          fetch(myRequest)
            .then(function(response) {
              return response.text()
            }, function(error) {
              console.log("got this error", error);
            })
            .then(function(html) {
              let answer = "";
              var parser = new DOMParser();
              var doc = parser.parseFromString(html, 'text/html');

              const nothing = doc.getElementById("noresults");
              if (nothing) {
                answer = `No entry for ${selectedText} at ${format(library)}`;
                console.log(answer);
              } else {
                var regex = /window\.OverDrive\.titleCollection.*\n/;
                var head = doc.getElementsByTagName("head").item(0);

                var match = regex.exec(head.innerHTML);
                var obj = match[0].substring("window.OverDrive.titleCollection = ".length);

                const books = eval(obj);

                const results = books.forEach(function(book) {
                  const authors = book.creators.filter(c => c.role == "Author").map(c => c.name).join(", ")
                  answer = `${(library in cards) ? "__" : ""}${book.title} (${authors}) ${book.isAvailable ? "available" : "UNAVAILABLE"} ${basePath}/media/${book.id}`;
                  console.log(answer);
                });
              }

              var newNode = document.createElement('p');
              newNode.textContent = answer;
              newNode.style.position = "absolute";
              newNode.style.top = "0";

              var referenceNode = document.querySelector('body');
              referenceNode.append(newNode);
            })
        }
      }
    }
  });

})();