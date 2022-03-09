import { get, writable, derived } from 'svelte/store'
import browser from "webextension-polyfill";


export const mainLibraries = [
  "https://librarypoint.overdrive.com",
  "https://mrl.overdrive.com",
];

export const moreLibraries = [
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


function tellBackground(db) {
  console.log("Send all this to background script", {db});
  browser.runtime.sendMessage({
    type: "dbUpdate",
    db
  });
}


export const localDB = writable({}, (set) => {
  console.log("First subscriber to localDB, see if background has anything.");
  browser.runtime.sendMessage({
    type: "getDB",
  }).then((db) => {
    console.log("db from background", {db});
    const currentDB = get(localDB);
    console.log("current db in injection", {db});
    set({...currentDB, ...db})
  });

  return () => console.log('no more subscribers to localDB');
});

export const backgroundSyncer = derived(localDB, $localDB => {
  tellBackground($localDB);
});

function queryLibrary(basePath, terms) {
  const library = basePath.substring(8, basePath.indexOf("."));
  console.log(`Look for ${terms} at ${library}`)
  const myRequest = new Request(`${basePath}/search?query=${terms.replaceAll(" ", "+")}&format=ebook-overdrive&sortBy=relevance`);

  fetch(myRequest)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const results = {
        type: "results",
        results: [],
      };

      const nothing = doc.getElementById("noresults");
      if (nothing) {
        const answer = `No entry for ${terms} at ${library}`;
        console.log(answer);
      } else {
        // try document.head instead of this
        // const head = doc.getElementsByTagName("head").item(0);

        const regex = /window\.OverDrive\.titleCollection.*\n/;
        const match = regex.exec(doc.head.innerHTML);
        const obj = match[0].substring("window.OverDrive.titleCollection = ".length);

        // const books = eval(obj); // I know this is bad, svelte
        const books = JSON.parse(obj.substring(0, obj.length-2))

        results.results = books.map(({id, title, isAvailable, firstCreatorName}) => ({
          id,
          title,
          isAvailable,
          firstCreatorName
        }));
      }

      localDB.update(db => {
        db[terms][library] = results;
        return db;
      });
    })
    .catch(err => {
      console.log({err});
      localDB.update(db => {
        db[terms][library] = {
          type: "error",
          err
        };
        return db;
      });
    });
}

export function search(terms, libraries=mainLibraries) {
  // check if this search is already in localstorage
  // (maybe remove this after dev time)
  // const sentinel = get(localDB);
  // console.log("get(localDB)", get(localDB), sentinel[terms].type);
  // if (terms in sentinel && sentinel[terms].type !== "querying") {
  //   console.log("Already got this one - need to do that filter to remove/prepend trick to put first in array");
  //   return;
  // }
  if (!terms) {
    return;
  }

  // setup empty localstorage
  const results = Object.fromEntries(
    libraries.map(basePath => [
      basePath.substring(8, basePath.indexOf(".")),
      {type: "querying"}
    ])
  );
  results["_meta"] = {
    datetime: (new Date()).toISOString()
  }

  localDB.update(db => {
    db[terms] = {...db[terms], ...results};
    return db;
  });

  for (const basePath of libraries) {
    // these will update the localstorage in their promise resolves
    queryLibrary(basePath, terms);
  }
}

// structure of state:
//
// const search = {
//   "Post Captain": {
//     "_meta": {
//       datetime: "2022-02-27T02:01:29.020Z"
//     }
//     "crrl": [
//       book.id,
//       book.title,
//       book.isAvailable,
//       book.creators,
//       book.creators.filter(c => c.role == "Author").map(c => c.name).join(", "),
//       book.firstCreatorName,
//       `${basePath}/media/${book.id}`, // url to book details page at this library
//     ],
//     "mrl": [
//     ],
//     "nnpls": [
//     ]
//   }
// }
