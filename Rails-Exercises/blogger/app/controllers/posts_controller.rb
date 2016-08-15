class PostsController < ApplicationController
  http_basic_authenticate_with name: "admin", password: "adminpass", except: [:index, :show]

  def index
    @blog = Blog.find(params[:blog_id])
    @posts = @blog.posts
  end

  def new
    @blog = Blog.find(params[:blog_id])
    @post = @blog.posts.build
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    @blog = Blog.find(params[:blog_id])
    @post = @blog.posts.create(post_params)

    if @post.save
      redirect_to @post.blog
    else
      render :new
    end
  end

  def update
    @post = Post.find params[:id]

    if @post.update(post_params)
      redirect_to @post.blog
    else
      render :edit
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    redirect_to @post.blog
  end

  private
    def post_params
      params.require(:post).permit(:title, :body)
    end
end
