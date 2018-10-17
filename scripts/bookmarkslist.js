/* global $ store Bookmark api */
'use strict';

//eslint-disable-next-line no-unused-vars
const bookmarksList = (function () {

  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }



  function generatebookmarkElement(bookmark) {
    if ('expanded' in bookmark && bookmark.expanded === true){

      return  `
          <br>
          <li id = ${bookmark.id} class = "site-title">${bookmark.title}</div>
         <button class= "minimize-button">-</button>
         <div class= "description">
           <p class= "saved-description">${bookmark.desc}</p>
         </div>
         <br>
         <div class= "bookmark-rating" id=${bookmark.rating}>
         <br>
         ${starGenerator(bookmark)}
         </div>
         <br>
           <button class = "link-button"><a href ="${bookmark.url}">go to link</a></button>  
           <button class= "delete-button">
             <span class = "button-label">Delete</span>
           </button>  
           </li>
           <br>`;
    } else {
      return `
            <br>
           <li id = ${bookmark.id} class = "site-title">${bookmark.title}</div>
           <button class= "expand-button">+</button>
            <br>
            <div class= "bookmark-rating" id=${bookmark.rating}>
            <br>
            ${starGenerator(bookmark)}
           </div>
           </li>
           <br>`;  
    } 
  }


  function starGenerator(bookmark){
    let star = ''; 
    for (let i = 0; i < Number(bookmark.rating); i++){
      star+='<span class="fa fa-star checked" ></span>';
    } return star;
  }



  //   } render();
  // }
  // function starGenerator(){
  //  console.log(store.bookmarks);
  //   let star = ''; 
  //   // for (let i = 0; i < store.bookmarks.length; i++){
  //   stars = store.bookmarks.map(()=> {
  //      for (let j = 0; j < Number(bookmarks[j].rating); j++){
  //      star+='<span class="fa fa-star checked" ></span>';
  //      })
  //   })
     
  //   }
  //   $('.bookmark-rating').html(star);
  //   render();
  //   }
  // }   
  

  function generateBookmarksString(store) {
    const bookmarkList = store.map((bookmark) => generatebookmarkElement(bookmark));
    const bookmarkListString = bookmarkList.join('');
    return bookmarkListString;
  }
    
  function render() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
    let bookmarks;
    if (store.filter !== null){
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
    } else { 
      bookmarks = store.bookmarks;
    }
    const bookmarkListString = generateBookmarksString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListString);
  }

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
        // console.log(bookmarkUpdate); 
        store.bookmarks.splice(index, 1, bookmarkUpdate);
        // console.log(store);
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
      // console.log(currentBookmark); 
      // console.log(store);
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
      // console.log(currentBookmark); 
      api.deleteBookmark(currentBookmark.id); 
      store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
      // console.log(store);
      render(); 
    }); 
  }


  function handleNewbookmarkSubmit(){
    $('.js-create-bookmark').on('click', '#js-submit-new', function (event) {
      event.preventDefault();
      console.log(Bookmark.validateTitle($('#new-title').val())); 
      console.log(Bookmark.validateRating($('#rating').val()));
      console.log(Bookmark.validateUrl($('#new-url').val()));
      const bookmark = Bookmark.create(
        $('#new-title').val(),
        $('#new-url').val(),
        $('#rating').val(),
        $('#new-description').val()
      );     

      api.createBookmark(bookmark, 
        (newBookmark) => {
          store.addBookmark(newBookmark);
          $('.js-bookmark-list').html();
          render(); 
        },
        (err)=> {
          console.log(err);
          store.setError(err);
          render();
        }
      );
    });
  }


  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  }

  function bindEventListeners() {
    handleNewbookmarkSubmit();
    handleFilterSet();
    handleExpandClick();
    handleMinimizeClick();
    handleDeleteClick();
    handleCloseError();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());