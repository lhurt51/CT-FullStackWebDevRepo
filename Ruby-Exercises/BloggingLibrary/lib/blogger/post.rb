module Blogger
  class Post
    attr_accessor :title, :body, :author,
      :timestamp,
      :blog,
      :comments

    def initialize
      @comments = []
    end
  end
end
