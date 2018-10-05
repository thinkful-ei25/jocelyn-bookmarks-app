'use strict';

function handleAddBookmarkClick(){
  $('.buttons-container').on ('click', '.add-button', event => console.log('yes, hello! open create form!'));
}

handleAddBookmarkClick(); //this works! 

function handleRatingButtonClick(){
  $('.buttons-container').on('click', '.min-rating', event => console.log('yes, I am here!, get the dropdown'));
}

handleRatingButtonClick(); // yaaaaaas

function handleExpandButtonClick(){
  $('.bookmark-list').on('click', '.expand-button', event => console.log('yesiree, I work too, change your store settings!'));
}

handleExpandButtonClick(); //I also work! 

function handleMinimizeButtonClick(){
  $('.bookmark-list').on('click', '.minimize-button', event => console.log('yuh!, go back to default store settings'));
}

handleMinimizeButtonClick(); //yuuuuuuh!

function handleNewBookMarkSubmit(){
  $('.commit-cancel').on('click', '.commit-bookmark', event => console.log('validate and then update yer database or throw error!'));
}

handleNewBookMarkSubmit(); //this works

function handleNewBookMarkCancel(){
  $('.commit-cancel').on('click', '.cancel-bookmark', event => console.log('go to default store setting!'));
}

handleNewBookMarkCancel(); //all good!

function handleFormEntry