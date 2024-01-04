require 'rails_helper'

RSpec.describe 'searches/index.html.erb', type: :feature do
  let(:user) { build(:user) }
  let!(:search) { create(:search, user:) }

  describe 'Testing search index page' do
    before :each do
      sign_in user
      visit searches_path
    end

    context 'When visiting index page' do
      it 'should see query' do
        expect(page).to have_text(search.query)
      end
    end
  end
end
