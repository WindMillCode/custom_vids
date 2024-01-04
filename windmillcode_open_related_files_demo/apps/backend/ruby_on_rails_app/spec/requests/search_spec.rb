require 'rails_helper'

RSpec.describe '/searches', type: :request do
  let(:user) { build(:user) }

  before :each do
    sign_in user
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      get searches_url
      expect(response).to be_successful
    end

    it 'renders a correct template' do
      get searches_url
      expect(response).to render_template(:index)
    end
  end
end
