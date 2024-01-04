class Article < ApplicationRecord
  include PgSearch::Model
  belongs_to :user

  pg_search_scope :search, against: { title: 'A', content: 'C' }, using: { tsearch: { prefix: true } }

  validates :title, presence: true, length: { in: 1..100 }
  validates :content, presence: true, length: { in: 1..500 }
end
