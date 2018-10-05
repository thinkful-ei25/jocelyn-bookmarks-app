'use strict';
/* global Bookmark STORES $ */

function handleNewBookMarkSubmit(){
  $('#new-bookmark-submit').on('click', '.commit-bookmark', event => {
    event.preventDefault();
    // console.log('this is submitting dont worry');
    // event.preventdefault();
    const titleName = $('#new-title').val();
    const newUrl= $('#new-url').val();
    const newDesc=$('#new-desc').val();
    
    console.log(bookmarks.addBookmark(titleName,newUrl,4,newDesc));
    // const newRate=$('.new-rating-assign').val();
    // console.log(newRate)
  }); 

}