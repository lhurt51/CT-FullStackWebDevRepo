function getPosts(success, error) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        success(this.responseText);
      } else {
        error(this.status);
      }
    }
  };

  req.open('GET', 'http://jsonplaceholder.typicode.com/users');
  req.send();
}



document.getElementById('btn-get-posts').addEventListener('click', function() {
  function onSuccess(responseText) {
    var object = JSON.parse(responseText);
    getUser(object)
  }

  function onError(status) {
    console.log(status);
  }

  getPosts(onSuccess, onError);
});
//This is how you transform JSON into an object.
var getUser = function (object) {
  var users = [];

  for (var i = 0; i < object.length ; i++) {
    var currentObject = object[i];
    var user = new User(currentObject.id, currentObject.name, currentObject.username, currentObject.email, currentObject.phone, currentObject.website)
    users.push(user)
  }

  console.log(users)
}
//This is the user constructor.
var User = function (id, name, username, email, phone, website) {
  this.id = id;
  this.name = name;
  this.username = username;
  this.email = email;
  this.phone = phone;
  this.website = website;
}
