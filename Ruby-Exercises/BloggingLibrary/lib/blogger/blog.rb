module Blogger
  class Blog
    attr_accessor :title, :author,
      :posts

    def initialize
      @posts = []
    end
  end
end
