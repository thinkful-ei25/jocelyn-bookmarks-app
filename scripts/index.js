/* global $, store, bookmarksList, api */
'use strict';
$(document).ready(function() {
  bookmarksList.bindEventListeners();
  bookmarksList.render();

  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarksList.render();
  });
});