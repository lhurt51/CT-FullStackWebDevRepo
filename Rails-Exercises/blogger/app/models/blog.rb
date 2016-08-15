class Blog < ApplicationRecord
  has_many :posts, dependent: :destroy

  validates :name, presence: true, length: { minimum: 3 }
  validates :description, presence: true
end
