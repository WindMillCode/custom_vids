require 'rails_helper'

RSpec.describe Article, type: :model do
  let(:article) { build(:article) }
  let(:article_without_content) { build(:article_without_content) }
  let(:article_without_title) { build(:article_without_title) }

  context 'When creating a new article' do
    it 'article should be valid' do
      expect(article).to be_valid
    end

    it 'title should not be blank' do
      expect(article_without_title).not_to be_valid
    end

    it 'content should not be blank' do
      expect(article_without_content).not_to be_valid
    end

    it 'content should not be longer than 500' do
      article.content = Faker::Lorem.paragraph_by_chars(number: 501)
      expect(article).not_to be_valid
    end
  end
end
