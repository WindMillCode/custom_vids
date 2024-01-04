FactoryBot.define do
  factory :article do
    title { 'Mona Lisa' }
    content { Faker::Lorem.paragraph_by_chars(number: 450) }
    user
  end

  factory :article_without_content, class: 'Article' do
    title { 'Article without content' }
    user
  end

  factory :article_without_title, class: 'Article' do
    content { 'Article without title' }
    user
  end
end
