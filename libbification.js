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
  ]

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
          console.log(`Look for ${selectedText} at ${library}`)
          let myRequest = new Request(`${basePath}/search?query=${selectedText.replaceAll(" ", "+")}&format=ebook-overdrive&sortBy=relevance`);

          fetch(myRequest)
            .then(function(response) {
              return response.text()
            }, function(error) {
              console.log("got this error", error);
            })
            .then(function(html) {
              var parser = new DOMParser();
              var doc = parser.parseFromString(html, 'text/html');

              const nothing = doc.getElementById("noresults");
              if (nothing) {
                console.log(`No entry for ${selectedText} at ${library}`);
              } else {
                var regex = /window\.OverDrive\.titleCollection.*\n/;
                var head = doc.getElementsByTagName("head").item(0);

                var match = regex.exec(head.innerHTML);
                var obj = match[0].substring("window.OverDrive.titleCollection = ".length);

                const books = eval(obj);

                const results = books.forEach(function(book) {
                  const authors = book.creators.filter(c => c.role == "Author").map(c => c.name).join(", ")
                  console.log(`${book.title} (${authors}) ${book.isAvailable ? "available" : "UNAVAILABLE"} ${basePath}/media/${book.id}`);
                });
              }
            })
        }
      }
    }
  });

})();