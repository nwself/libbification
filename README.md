# Libbification

Based almost entirely on [https://github.com/mdn/webextensions-examples/tree/master/commands]().

Highlight the name of a book or author on a page and press Cmd+Shift+U to search your library's OverDrive for ebooks related to the selected text. The console will list the search results in the form `"<title> (<authors>) <available> <url>"`.

Should in theory work for any library that has a `https://<library>.overdrive.com/` type of site.

## Install

Go to `about:debugging#/runtime/this-firefox` choose Load Temporary Add-on and browse to `libbification.js`