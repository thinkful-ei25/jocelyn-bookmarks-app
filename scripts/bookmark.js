/* global cuid */

'use strict';

const Bookmark = (function(){

  const validateTitle = function(title) {
    if (!title || title.length < 1 || typeof(title)!== 'string')
      throw new Error('Title must be at least one character');
  };

  const validateUrl = function(url) {
    if (!url || title.length < 5) throw new Error('Must include URL');
  };
  
  const validateRating = function(rating) {
    if (!rating) throw new Error('Must select rating');
  };

  const create = function(title, url, rating, desc){
    return {
      id: 444,
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