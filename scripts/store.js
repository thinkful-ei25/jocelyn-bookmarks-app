'use strict';
/* global Bookmark */
//eslint-disable-next-line no-unused-vars
const store = (function(){
  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(bookmark) {
    try{
      Bookmark.validateTitle(bookmark.title);
      Bookmark.validateRating(bookmark.rating);
      Bookmark.validateUrl(bookmark.url);  
      this.bookmarks.push(bookmark);
    } catch(e){
      console.log(e.message);
    }
  };

  const findByMinRating = function(){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.rating === store.filter);
    console.log(this);
    return this.bookmarks;

  }; 
 
  const findById = function(id){
    this.bookmarks = this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndUpdate = function(id, newData){
    const item = this.findById(id);
    Object.assign(item, newData); 
  };

  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };




  return {
    bookmarks: [],
    filter:null,
    error:null,

    setError,
    addBookmark,
    findByMinRating,
    findById,
    findAndUpdate,
    findAndDelete
  };
  
}());

