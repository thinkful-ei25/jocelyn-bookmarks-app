/*global cuid */
'use strict';
//eslint-disable-next-line no-unused-vars
const Item = (function(){

  const validateTitle = function(title) {
    if (!title) throw new TypeError('Title must not be blank');
  };

  const validateUrl = function(url) {
    if (!url) throw new TypeError('Url must not be blank');
  };

  const validateRating = function(rating){
    const vals = [1,2,3,4,5];
    if (!rating || !(vals.includes(rating)))
      throw new TypeError('Rating must have value between 1 and 5');
  };

  const create = function(title,url,desc,rating) { 
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,
      expanded:false,
      create: true,
      filter: null,
    };
  };
  return {
    validateTitle,
    validateUrl,
    validateRating,
    create,
  };

}());