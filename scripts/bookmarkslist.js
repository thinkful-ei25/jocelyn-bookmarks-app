/* global $ store Bookmark api */
'use strict';

//eslint-disable-next-line no-unused-vars
const bookmarksList = (function () {


  function generatebookmarkElement(bookmark) {
    if ('expanded' in bookmark && bookmark.expanded === true){
      return `
            <li id = ${bookmark.id} class = "site-title">${bookmark.title}</div>
      
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
           </button>  
           </li>`;
    } else {
      return `
           <li id = ${bookmark.id} class = "site-title">${bookmark.title}</div>
           <button class= "expand-button">+</button>
            <div class= "rating" id=${bookmark.rating}>
           <span id="1" class="fa fa-star checked" checked ></span>
           </li>`;  
    }
  }


  
  

  function generateBookmarksString(store) {
    const bookmarkList = store.map((bookmark) => generatebookmarkElement(bookmark));
    const bookmarkListString = bookmarkList.join('');
    return bookmarkListString;
  }
    
  function render() {
    let bookmarks;
    if (store.filter !== null){
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    } else { 
      bookmarks = store.bookmarks;
    }
    const bookmarkListString = generateBookmarksString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  }

  // //<div name = "filter" class = "js-filter-fields">
  //           <label class="rating" for="new-rating">filter by rating</label>
  //           <input type="number" id = "rating-filter" placeholder= "1" min = "1" max="5" />
  //           <input type="submit" class= "rating-submit">
  //        // </div>

  function handleExpandClick(){
    $('.js-bookmark-list').on('click', '.expand-button', function(event){
      event.preventDefault(); 
      let item = event.currentTarget.closest('li');
      let bookmark = (store.bookmarks.find(bookmark => bookmark.id === item.id)); 
      let index = store.bookmarks.indexOf(bookmark); 
      if ('expanded' in bookmark) {
        bookmark.expanded = true;
        render(); 
      } else {
        let bookmarkUpdate = Object.assign({'expanded':true}, bookmark); 
        console.log(bookmarkUpdate); 
        store.bookmarks.splice(index, 1, bookmarkUpdate);
        console.log(store);
        render();
      }
    });
  }

  function handleMinimizeClick(){
    $('.js-bookmark-list').on('click', '.minimize-button', function(event){
      event.preventDefault(); 
      let item = event.currentTarget.closest('li');
      let id = item.id; 
      let currentBookmark= (store.bookmarks.find(bookmark => bookmark.id === id));
      currentBookmark.expanded = false;  
      console.log(currentBookmark); 
      console.log(store);
      render();
    });
  }

  function handleFilterSet(){
    $('.js-filter-fields').on('click', '.rating-submit', function (event) {
      event.preventDefault();
      const filterValue = $('#rating-filter').val();
      store.filter = Number(filterValue);    
      render(); 

    });
  }

  function handleDeleteClick(){
    $('.js-bookmark-list').on('click', '.delete-button', function (event){
      event.preventDefault(); 
      let item = event.currentTarget.closest('li');
      let id = item.id; 
      let currentBookmark= (store.bookmarks.find(bookmark => bookmark.id === id));
      console.log(currentBookmark); 
      api.deleteBookmark(currentBookmark.id); 
      store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
      console.log(store);
      render(); 
    }); 
  }


  function handleNewbookmarkSubmit(){
    $('.js-create-bookmark').on('click', '#js-submit-new', function (event) {
      event.preventDefault();
      const bookmark = Bookmark.create(
        $('#new-title').val(),
        $('#new-url').val(),
        $('#rating').val(),
        $('#new-description').val()
     
      );     
      console.log(bookmark);

      api.createBookmark(bookmark, 
        (newBookmark) => {
          store.addBookmark(newBookmark);
          $('.js-bookmark-list').html();
          render(); 
        },
        (err)=> {
          console.log(err);
          render();
        }
      );
    });
  }

  function bindEventListeners() {
    handleNewbookmarkSubmit();
    handleFilterSet();
    handleExpandClick();
    handleMinimizeClick();
    handleDeleteClick();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());