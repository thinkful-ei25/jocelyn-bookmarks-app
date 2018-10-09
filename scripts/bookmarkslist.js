'use strict';
/* global $ */
//eslint-disable-next-line no-unused-vars
const testStore = [{id:7575757, title:'bingo bingo', url:'www.hehehe.com', rating: 5, desc:'tania likes this one', expanded:false}];

function generateNewItemForm() {
  return `
  <form id="new-bookmark-submit" role="form" class= ".js-new-bookmark-submit">
  <fieldset class="add-bookmark">
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
 </form>`;
}

const handleNewItemSubmit = event => {
event.preventDefault();
const data = {};
const dataContainer = document.getElementsByClassName('results_')
}

function generateItemElement(item) {
  if (item.expanded === false){
    return `
  <li class = "js-bookmark-list">
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

function generateBookmarksString(testStore) {
  const bookmarks = testStore.map((item) => generateItemElement(item));
  return bookmarks.join('');
}
  
function render() {
  // let bookmarks = store.bookmarks;
  // if (store.filter !== null) {
  //   bookmarks.findByMinRating(store.filter);
  // } console.log('`render` ran');
  const bookmarkListString = generateBookmarksString(testStore);
  $('.js-bookmark-list').html(bookmarkListString);
}
  
generateItemElement(testStore[0]);
render();
