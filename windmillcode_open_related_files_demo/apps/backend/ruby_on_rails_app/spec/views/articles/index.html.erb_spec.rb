require 'rails_helper'

RSpec.describe 'articles/index.html.erb', type: :feature do
  let(:user) { build(:user) }
  let!(:article) { create(:article, user:) }

  describe 'Testing article index page' do
    before :each do
      sign_in user
      visit articles_path
    end

    context 'When visiting index page' do
      it 'should see article title' do
        expect(page).to have_text(article.title)
      end

      it 'should see the author name' do
        expect(page).to have_text(user.name)
      end

      it 'should see the content' do
        expect(page).to have_text(article.content)
      end

      it 'should see the number of articles' do
        expect(page).to have_text(Article.all.count)
      end
    end
  end
end
