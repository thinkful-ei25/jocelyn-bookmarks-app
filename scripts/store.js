'use strict';

const STORE = {
  // bookmarks: [{
  //   id:484828282,
  //   title:'whales',
  //   url:'www.whalesRus.com',
  //   desc: 'whales are so cool',
  //   rating: 4,
  //   expanded: false
  // }],
  create:false, 
  filter: null, 
  error: null
};

function listBookmarkElement(bookmark, bookmarkIndex, template) {
  
  
  return `
  <li class = "js-item-element bookmark-condensed">
  <div class = "site-title">${bookmark.title}</div>
  <button class= "expand-button">+</button>
 
</li>
  `;
} 
  // <div class= "rating">
  //   <span id="1" class="fa fa-star checked"></span>
  //   <span id="2" class="fa fa-star checked"></span>
  //   <span id="3" class="fa fa-star checked"></span>
  //   <span id="4" class="fa fa-star checked"></span>
  //   <span id="5" class="fa fa-star checked"></span>
  // </div>