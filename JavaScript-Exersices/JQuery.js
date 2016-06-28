$(document).ready(function () {
  $('article h1');
  $('#article-1 h1');

  $('article h1:first').text('Something else.');

  $('#article-1 > h1').toggleClass('article-heading');

  $('.btn-get-it').attr('href', 'http://www.google.com');

  $('#artilce-1').append('<p></p>');
  $('<p></p>').appendTo('#article-1');
  $('h1').css('color', 'red');

  $('#btn')
    .click(function () {$('body').append('<article> <h1>New Article</h1> <p>Another very useful aspect of jQuery is that it allows you to chain actions on the same selector.</p> </article>')})
    .mouseover(function () {$('body').append('<article> <h1>Cooler Article</h1> <p>However, if you want to perform different actions depending on an element\'s attribute, then using the each() method will make sense</p> </article>')});

    
});
