'use strict';
/* global Bookmark */
//eslint-disable-next-line no-unused-vars
const store = (function(){

  const addBookmark = function(bookmark) {
    try{
      Bookmark.validateTitle(title);
      Bookmark.validateRating(rating);
      Bookmark.validateUrl(url);
    } catch(e){
      console.log(e.message);
    }
  };

  const findByMinRating = function(rating){
    return this.bookmarks.find(bookmark => bookmark.rating >= rating);
  }; 


  const setItemExpand = function(id) {
    const bookmark = this.findById(id);
    bookmark.expanded = !bookmark.expanded;
  };

  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };




  return {
    bookmarks: [],
    create:false,
    filter:null,
    error:null,

    addBookmark,
    findByMinRating,
    setItemExpand,
    findAndDelete
  };
  
}());

