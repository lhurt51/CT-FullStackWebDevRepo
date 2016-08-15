class AddBlogRefToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :blog, :refernces
  end
end
