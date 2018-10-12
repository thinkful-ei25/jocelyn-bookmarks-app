'use strict';
/*global $*/

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jocelyn';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  const createBookmark = function(bookmark, onSuccess, onError) {
    const newBookmark = JSON.stringify(bookmark);
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: onSuccess,
      error: onError,
    });
  };
  // the only updating I need is when requesting expanded view on an item
  const updateBookmark = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };

  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
}());