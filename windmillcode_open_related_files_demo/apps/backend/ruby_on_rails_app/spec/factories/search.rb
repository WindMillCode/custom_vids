FactoryBot.define do
  factory :search do
    query { 'How are you, Emil?' }
    user
  end

  factory :search_without_query, class: 'Search' do
    user
  end
end
