/* global cuid */

'use strict';
//eslint-disable-next-line no-unused-vars
const Bookmark = (function(){

  const validateTitle = function(title) {
    if (!title || title.length < 1) {
      let e = new Error('Title must be at least one character'); 
      throw e; 
    } return; 
  };

  const validateUrl = function(url) {
    if (!url || url.length < 5) throw new Error('Must include URL');
  };
  
  const validateRating = function(rating) {
    if (!rating) throw new Error('Must select rating');
  };

  const create = function(title, url, rating, desc){
    return {
      id: cuid(),
      title, 
      url,
      rating,
      desc,
    };
  };

  return {
    validateTitle,
    validateUrl,
    validateRating,
    create,
  };
  

}());