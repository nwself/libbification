import { writable } from 'svelte/store'

//librarypoint,mrl,finditva,nnpls
export const mainLibraries = [
  "https://librarypoint.overdrive.com",
  "https://mrl.overdrive.com",
  "https://finditva.overdrive.com",
  "https://nnpls.overdrive.com",
];

//chesapeake,rvl,princewilliam,brdc,swvapub,vppl,elprlibrary,yorkcountyva
export const moreLibraries = [
    "https://chesapeake.overdrive.com",
    "https://rvl.overdrive.com",
    "https://princewilliam.overdrive.com",
    "https://brdc.overdrive.com",
    "https://swvapub.overdrive.com",
    "https://vppl.overdrive.com",
    "https://elprlibrary.overdrive.com",
    "https://yorkcountyva.overdrive.com",
];

export const names = {
  "librarypoint": "CRRL",
  "mrl": "Massanutten",
  "finditva": "Library of Virginia",
  "nnpls": "Newport News",
  "chesapeake": "chesapeake",
  "rvl": "rvl",
  "princewilliam": "princewilliam",
  "brdc": "brdc",
  "swvapub": "swvapub",
  "vppl": "vppl",
  "elprlibrary": "elprlibrary",
  "yorkcountyva": "yorkcountyva",
  "brooklyn": "brooklyn",
}

export const localDB = writable({});


function queryLibrary(shortcode, terms) {
  const library = shortcode;
  const basePath = `https://${shortcode}.overdrive.com`;
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
        console.log({books});

        results.results = books.map(({id, title, isAvailable, firstCreatorName, covers}) => ({
          id,
          title,
          isAvailable,
          firstCreatorName,
          cover: covers.cover150Wide 
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


export function search(terms, libraries) {
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
  console.log("Doing a search");
  // setup empty localstorage
  const results = Object.fromEntries(
    libraries.map(shortcode => [
      shortcode,
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

  for (const shortcode of libraries) {
    // these will update the localstorage in their promise resolves
    queryLibrary(shortcode, terms);
  }
}