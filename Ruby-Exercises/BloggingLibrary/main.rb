require 'pp'
require './lib/blogger'

user = Blogger::User.new
user.first_name = "Liam"
user.last_name = "Hurt"
user.email = "liamhurt51@gmail.com"

user2 = Blogger::User.new
user2.first_name = "Randy"
user2.last_name = "Rando"
user2.email = "rantheran@gmail.com"

blog = Blogger::Blog.new
blog.title = "Liam's Blog"
blog.author = user

user.blogs.push(blog)

post = Blogger::Post.new
post.title = "My Adventure"
post.author = user
post.body = "I adventured through San Fran for hours"

comment = Blogger::Comment.new
comment.author = user2
comment.body = "I bet you were so lost"

user.posts.push(post)
user2.comments.push(comment)
post.comments.push(comment)
blog.posts.push(post)

pp user
