'use strict';
/* global Bookmark STORES $ */
const bookmarksList = (function(){
  // function generateError(err) {
  //   let message = '';
  //   if (err.responseJSON && err.responseJSON.message) {
  //     message = err.responseJSON.message;
  //   } else {
  //     message = `{$err.code} Server Error`;
  //   }
  // }

  // return ` 
  
  function generateBookmarkElement(bookmark){

    if (bookmark.create === false && bookmark.expanded === false){
      // const starValue = bookmark.rating;
      // for (let i = 0 ; i < starValue; i++){
    //  want to add a class of checked for each star in rating group
      // }
      return  `
      <div class= "bookmark-list">
        <li class = "js-item-element bookmark-condensed" data-bookmark-id="${bookmark.id}>
          <div class = "site-title">${bookmark.title}</div>
          <button class= "expand-button">+</button>
          <div class= "rating" >
            <span id="1" class="fa fa-star checked"></span>
            <span id="2" class="fa fa-star checked"></span>
            <span id="3" class="fa fa-star checked"></span>
            <span id="4" class="fa fa-star"></span>
            <span id="5" class="fa fa-star"></span>
          </div>
        </li>
      </div>`;
    
    } else if (bookmark.create === false && bookmark.expanded === true){
      return `
        <li class = "js-item-element bookmark-expanded" data-bookmark-id="${bookmark.id}>
          <div class = "site-title">${bookmark.title}</div>
          <button class= "minimize-button">-</button>
          <div class= "description">
            <p class= "saved-description">${bookmark.desc}</p>
          </div>
          <div class= "rating">
              <span id="1" class="fa fa-star checked"></span>
              <span id="2" class="fa fa-star checked"></span>
              <span id="3" class="fa fa-star checked"></span>
              <span id="4" class="fa fa-star"></span>
              <span id="5" class="fa fa-star"></span>
            </div>
          <button class = "link-button"><a href = ${bookmark.url}>go to link</a></button>  
          <button class= "delete-button">
            <span class = "button-label">Delete</span>
          </button>
        </li>`;
    } else if (bookmark.create === true) {
      return $('div.buttons-container').html(
        `<form id="new-bookmark-submit" role="form" class= "add-bookmark">
        <fieldset>
          <div>
            <legend>Add Bookmark</legend>
          </div> 
           <br>
          <div class= "name-url">
            <label class = "field-label" for="title">Title:</label>
            <input placeholder= "Whales r us" id="new-title" name= "new-title" type="text">
            <label class = "field-label" for="url">URL:</label>
            <input placeholder="www.whalesRus.com" id="new-url" name= "new-url" type="text">
          </div>
          <br>
          <div class="description-field">
            <textarea id = "new-desc" name ="new-desc" placeholder= "Complete selection of miniature whale replicas, funds go to protecting the whales" role="textbox" class="new-description"></textarea>
          </div>
          <br>
          <div class="new-rating-assign">
              <label class= "star-rating-label" for="rating">Star rating:</label>
              <input type="radio" name="stars" value="1"/>1
              <input type="radio" name="stars" value="2"/>2
              <input type="radio" name="stars" value="3"/>3
              <input type="radio" name="stars" value="4"/>4
              <input type="radio" name="stars" value="5"/>5
          </div>
          <button class="commit-bookmark" type="submit">save</button>
          <button class="cancel-bookmark">X</button>
        </fieldset> 
       </form> 
        `
      ); 
    }
  }
  function render() {
    let bookmarks = store.bookmarks;
    if (bookmarks.filter !== null) {
      bookmarks = bookmarks.filter
    }
  }

}());

// function handleAddBookmarkClick(){
//   // $('.buttons-container').on ('click', '.add-button', event => \);
// }

// // handleAddBookmarkClick(); //this works! 

// function handleRatingButtonClick(){
//   $('.buttons-container').on('click', '.min-rating', event => console.log('yes, I am here!, get the dropdown'));
// }

// handleRatingButtonClick(); // yaaaaaas

// function handleExpandButtonClick(){
//   $('.bookmark-list').on('click', '.expand-button', event => console.log('yesiree, I work too, change your store settings!'));
// }

// handleExpandButtonClick(); //I also work! 

// function handleMinimizeButtonClick(){
//   $('.bookmark-list').on('click', '.minimize-button', event => console.log('yuh!, go back to default store settings'));
// }

// handleMinimizeButtonClick(); //yuuuuuuh!

// function handleNewBookMarkSubmit(){
//     $('#new-bookmark-submit').on('click', '.commit-bookmark', event => {
//       event.preventDefault();
//       // console.log('this is submitting dont worry');
//       // event.preventdefault();
//       const titleName = $('#new-title').val();
//       const newUrl= $('#new-url').val();
//       const newDesc=$('#new-desc').val();
    
//       console.log(bookmarks.addBookmark(titleName,newUrl,4,newDesc));
//     // const newRate=$('.new-rating-assign').val();
//     // console.log(newRate)
//     }); 

//   }

//   function handleNewBookMarkCancel(){
//     $('.commit-cancel').on('click', '.cancel-bookmark', event => console.log('go to default store setting!'));
//   }
//   function handleMinimizeButtonClick(){
//     $('.bookmark-list').on('click', '.minimize-button', event => console.log('yuh!, go back to default store settings'));
//   }





  