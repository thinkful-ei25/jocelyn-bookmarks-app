'use strict';
/* global store $ cuid Bookmark */
//eslint-disable-next-line no-unused-vars
const bookmarksList = (function(){

  function generateItemElement(item) {
    if (item.expanded === false){
      return `
  <li class = "js-item-element bookmark-condensed">
    <div class = "site-title">${item.title}</div>
    <button class= "expand-button">+</button>
    <div class= "rating" id=${item.rating}>
      <span id="1" class="fa fa-star checked"></span>
      <span id="2" class="fa fa-star checked"></span>
      <span id="3" class="fa fa-star checked"></span>
      <span id="4" class="fa fa-star"></span>
      <span id="5" class="fa fa-star"></span>
    </div>
  </li>`;
    } else 
      return `
    <li class = "js-item-element bookmark-expanded" data-item-id ="${item.id}">
       <div class = "site-title">${item.title}</div>
          <button class= "minimize-button">-</button>
          <div class= "description">
          <p class= "saved-description">${item.desc}</p>
          </div>
          <div class= "rating" id=${item.rating}>
              <span id="1" class="fa fa-star checked"></span>
              <span id="2" class="fa fa-star checked"></span>
              <span id="3" class="fa fa-star checked"></span>
              <span id="4" class="fa fa-star"></span>
              <span id="5" class="fa fa-star"></span>
            </div>
          <button class = "link-button"><a href ="${item.url}">go to link</a></button>  
          <button class= "delete-button">
            <span class = "button-label">Delete</span>
          </button>
        </li>`;
  }

  function generateBookmarkForm(){
    return `
    <form id="new-bookmark-submit" role="form" class= "add-bookmark">
      <fieldset class="add-bookmark">
        <div>
          <legend>Add Bookmark</legend>
        </div> 
         <br>
        <div class= "name-url">
          <label class = "field-label" for="title">Title:</label>
          <input placeholder= "Whales r us" id="new-title" name= "new-title" type="text">
          <label class = "field-label" for="url" >URL:</label>
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
     </form>`;
  } 

  
  
  function generateBookmarksString(shoppingList) {
    const bookmarks = shoppingList.map((item) => generateItemElement(item));
    return bookmarks.join('');
  }
  function generateFormString(){
    const formhtml = generateBookmarkForm();
    return formhtml.join('');
  }
  
  function render() {
    // Filter item list if store prop is true by item.checked === false
    let bookmarks = store.bookmarks;
    // Filter item list if store prop `searchTerm` is not empty
    if (store.filter !== null) {
      bookmarks.findByMinRating(store.filter);
    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarkListString = generateBookmarksString(bookmarks);
    const formhtmlString = generateFormString();
    // insert that HTML into the DOM
    $('.js-shopping-list').html(bookmarkListString);
    $('.new-bookmark-submit').html(formhtmlString);
  }
  
  
  function addItemToBookmarkList(itemTitle, itemUrl, itemRating, itemDesc) {
    store.bookmarks.push({ id: cuid(), title: itemTitle, url: itemUrl,  rating: itemRating, desc: itemDesc});
  }
  
  function handleNewbookmarksubmit() {
    $('#new-bookmark-submit').on('click', '.commit-bookmark',function (event) {
      event.preventDefault();
      const itemTitle = $('#new-title').val();
      $('#new-title').val('');
      const itemUrl = $('#new-url').val();
      $('#new-url').val('');
      const itemDesc = $('#new-desc').val();
      const rating = 3;
      // rating.val('');
      addItemToBookmarkList(itemTitle, itemUrl, rating, itemDesc);
      console.log(store.bookmarks);
      render();
    });
  }
  
  // function toggleCheckedForListItem(id) {
  //   const foundItem = store.bookmarks.find(item => item.id === id);
  //   foundItem.checked = !foundItem.checked;
  // }
  
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  

  function deleteListItem(id) {
    const index = store.bookmarks.findIndex(item => item.id === id);
    store.bookmarks.splice(index, 1);
  }
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-item-element bookmark-expanded').on('click', '.delete-button', event => {
      // get the index of the item in store.bookmarks
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      deleteListItem(id);
      // render the updated shopping list
      render();
    });
  }

  function handleAddItemClicked() {
    $('.buttons-container').on('click', '.add-button', event => event);
    generateBookmarkForm();
  }
  
  handleAddItemClicked();
  

  
  function bindEventListeners() {
    handleNewbookmarksubmit();
    handleDeleteItemClicked();
    handleAddItemClicked();
    
    
  }

  // This object contains the only exposed methods from this module:
  return {
    render,
    bindEventListeners,
  };
}());

  