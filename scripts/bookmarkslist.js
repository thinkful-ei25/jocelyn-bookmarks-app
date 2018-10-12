'use strict';
/* global $ store Bookmark api */
//eslint-disable-next-line no-unused-vars
const testStore = [{id:7575757, title:'bingo bingo', url:'www.hehehe.com', rating: 5, desc:'tania likes this one', expanded:false}];

// const bookmarkList = (function () {



$( document ).ready(function() {
  handleNewbookmarkSubmit();
  render();
});


function handleNewbookmarkSubmit(){
  $('.js-create-bookmark').on('click', '#js-submit-new', function (event) {
    event.preventDefault();
    const bookmark = Bookmark.create(
      $('#new-title').val(),
      $('#new-url').val(),
      $('#rating').val(),
      $('#new-description').val()
     
    );
    api.createBookmark(bookmark);
  } 
  );
}


function generatebookmarkElement(store) {
  const bookmark = store.bookmarks;
  if (store.bookmark.expanded === false){
    return `div class = "site-title">${bookmark.title}</div>
    <button class= "expand-button">+</button>
  <div class= "rating" id=${bookmark.rating}>
      <span id="1" class="fa fa-star checked" checked ></span>
  </div>`
    ;
  } else {
    return ` <div class = "site-title">${bookmark.title}</div>
              
    <button class= "minimize-button">-</button>
      
    <div class= "description">
      <p class= "saved-description">${bookmark.desc}</p>
    </div>
    <div class= "rating" id=${bookmark.rating}>
        <span id="1" class="fa fa-star checked"></span>
    </div>
      <button class = "link-button"><a href ="${bookmark.url}">go to link</a></button>  
      <button class= "delete-button">
        <span class = "button-label">Delete</span>
      </button>`;
  }
}


  

function generateBookmarksString(store) {
  const bookmarkList = store.map((bookmark) => generatebookmarkElement(bookmark));
  const bookmarkListString = bookmarkList.join('');
  return bookmarkListString;
}
    
function render() {
  let bookmarks = store.bookmarks;
  if (bookmarks.filter !== null) {
    store.findByMinRating(bookmarks.filter);
  }
  console.log('`render` ran');

  const bookmarkListString = generateBookmarksString(bookmarks);
  $('.js-bookmark-list').html(bookmarkListString);
}


