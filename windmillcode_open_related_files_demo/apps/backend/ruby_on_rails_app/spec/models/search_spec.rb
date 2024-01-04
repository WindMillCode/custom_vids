require 'rails_helper'

RSpec.describe Search, type: :model do
  let(:user) { build(:user) }
  let(:search) { build(:search) }
  let(:search_without_query) { build(:search_without_query) }

  context 'When creating a new search' do
    it 'search should be valid' do
      expect(search).to be_valid
    end

    it 'query should not be blank' do
      expect(search_without_query).not_to be_valid
    end

    it 'invalid searches should not be saved' do
      invalid_search = Search.new(query: 'What is a', user_id: user.id)
      expect(invalid_search).not_to be_valid
    end
  end
end
