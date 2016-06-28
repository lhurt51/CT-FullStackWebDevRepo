function getPosts(userInput, success, error) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status > 200 && this.status < 300) {
        success(this.responseText);
      } else {
        error(this.status);
      }
    }
  };

  req.open('POST', 'http://jsonplaceholder.typicode.com/posts');
  req.send(userInput);
  console.log(userInput);
};

document.getElementById('btn-get-posts').addEventListener('click', function () {
  function onSuccess(responseText) {
    console.log('Success!!');
    console.log(responseText)
  };
  function onError(status) {
    console.log(status);
  };
  getPosts(getInput(), onSuccess, onError);
});
// This is how you transform JSON into an object.
var getInput = function () {
  var titleInput = document.getElementById('title-input');
  var bodyInput = document.getElementById('body-input');
  var userPost = new Post (titleInput.value, bodyInput.value);
  return userPost
};
// This is the user constructor.
var Post = function (title, body) {
  this.title = title;
  this.body = body;
};
