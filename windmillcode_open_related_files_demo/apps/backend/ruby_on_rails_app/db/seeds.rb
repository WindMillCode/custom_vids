john = User.create(
  email: 'john@gmail.com',
  password: '123123',
  name: 'John'
)

tom = User.create(
  email: 'tom@gmail.com',
  password: '123123',
  name: 'Tom'
)

10.times do
  Article.create(
    title: Faker::Name.unique.name,
    content: Faker::Lorem.paragraph_by_chars,
    user_id: john.id
  )
end

10.times do
  Article.create(
    title: Faker::Name.unique.name,
    content: Faker::Lorem.paragraph_by_chars,
    user_id: tom.id
  )
end
