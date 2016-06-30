var posts = []

$('.btn').on('click', function () {
  $.ajax('http://jsonplaceholder.typicode.com/posts', {
    method: 'GET',
  })
  .done(function(users) {
    $.each(users, function () {
      var post = new Post(this.id, this.userId, this.title, this.body)
      posts.push(post)
      display()
    })
    console.log(posts)
  })
  .fail(function(err) {
    console.log('error')
  })
  .always(function() {
    console.log('complete')
  });
})

var display = function () {
  $.each(posts, function () {
    var userContent = $(".content")
    var article = $('<article></article>')
    article.text('Posted by: ' + this.userId)
    var titleText = $('<h1></h1>')
    titleText.text(this.title)
    var bodyText = $('<p></p>')
    bodyText.text(this.body)

    article.append(titleText)
    article.append(bodyText)
    userContent.append(article)
  })
}

var Post = function (id, userId, title, body) {
  this.id = id;
  this.userId = userId;
  this.title = title;
  this.body = body;
}

$.ajax('http://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    data: {
      title: 'New Post',
      body: 'Wow this is cool'
    }
  })
  .done(function(user) {
    console.log(user);
    var userContent = $(".content")
    var article = $('<article></article>')
    article.text('New submition id: ' + user.id)
    var titleText = $('<h1></h1>')
    titleText.text(user.title)
    var bodyText = $('<p></p>')
    bodyText.text(user.body)

    article.append(titleText)
    article.append(bodyText)
    userContent.append(article)
  })
  .fail(function() {
    console.log('error');
  })
  .always(function() {
    console.log('complete');;
  });
