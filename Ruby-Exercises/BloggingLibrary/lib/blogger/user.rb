module Blogger
  class User
    attr_accessor :first_name, :last_name,
      :username, :email, :password,
      :blogs,
      :posts,
      :comments

    def initialize
      @blogs = []
      @posts = []
      @comments = []
    end
  end
end
