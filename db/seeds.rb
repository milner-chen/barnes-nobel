# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Product.destroy_all
    Category.destroy_all
    CartItem.destroy_all
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')
    ApplicationRecord.connection.reset_pk_sequence!('categories')
    ApplicationRecord.connection.reset_pk_sequence!('cart_items')
  
    puts "Creating demo user..."
    # Create one user with an easy to remember username, email, and password:
    User.create!( 
      first_name: 'Demo',
      last_name: 'Lition',
      email: 'demo@user.io',
      password: 'password'
    )
    
    # More users
    # 10.times do 
    #   User.create!({
    #     first_name: Faker::Name.first_name,
    #     last_name: Faker::Name.last_name,
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end

    puts "Creating categories..."
    # 5.times do
    #   Category.create!({
    #     name: Faker::Book.genre.capitalize
    #   })
    # end
    Category.create!({name: "Fantasy"})

    # formats = ['Hardcover', 'Paperback', 'Signed Book', 'BN Exclusive', 'Large Print'];
    # availability = ['In Stock', 'Available Online'];
    # file = URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/testing.webp")
    # file = File.open("app/assets/temp-cover.png")

    puts "Creating products..."
    # create products with seller, name, price, description, category
    # 50.times do #|n|
    #   product = Product.create!({
    #     seller: Faker::Book.author,
    #     name: Faker::Book.unique.title,
    #     # price: Faker::Commerce.price(range: 0..99.99),
    #     price: rand(0..100.0).round(2),
    #     description: Faker::Lorem.paragraph(sentence_count: 15),
    #     category_id: Faker::Number.between(from: 1, to: 5),
    #     format: formats.sample,
    #     availability: availability.sample
    #   })
    #   # product.photo.attach(
    #   #   io: file,
    #   #   filename: "testing-#{n}.webp",
    #   #   # content_type: "image/webp"
    #   # )
    # end
    product_1 = Product.create!({
        seller: "Rick Riordan",
        name: "The Lightning Thief (Percy Jackson and the Olympians Series #1)",
        price: 8.99,
        description: "Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse—Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him.\nWhen Percy's mom finds out, she knows it's time that he knew the truth about where he came from, and that he go to the one place he'll be safe. She sends Percy to Camp Half Blood, a summer camp for demigods (on Long Island), where he learns that the father he never knew is Poseidon, god of the sea. Soon a mystery unfolds and together with his friends—one a satyr and the other the demigod daughter of Athena—Percy sets out on a quest across the United States to reach the gates of the Underworld (located in a recording studio in Hollywood) and prevent a catastrophic war between the gods.",
        category_id: 1,
        format: "Paperback",
        availability: "Available Online"
      })

    # file = File.open("app/assets/temp-cover.png")

    # Product.all.each_with_index do |product|
    #   product.photo.attach(
    #     io: file,
    #     filename: "temp-cover.png"
    #   )
    # end

    # Product.first.photo.attach(
    #   io: file,
    #   filename: "temp-cover.png"
    # )

    # 50.times do |n|
    #   URI.open('https://barnes-nobel-seeds.s3.amazonaws.com/temp-cover.png') do |file|
    #     Product.new({
    #       seller: Faker::Book.author,
    #       name: Faker::Book.unique.title,
    #       price: Faker::Commerce.price(range: 0..99.99),
    #       description: Faker::Lorem.paragraph(sentence_count: 15),
    #       category_id: Faker::Number.between(from: 1, to: 5),
    #       format: formats.sample,
    #       availability: availability.sample
    #     }) do |p|
    #       p.photo.attach(
    #         io: file,
    #         filename: "temp-cover.png"
    #       )
    #     end.save!
    #   end
    # end

    # puts "Creating cart items..."
    # CartItem.create!({user_id: 5, product_id: 2, quantity: 2});
    # CartItem.create!({user_id: 5, product_id: 6, quantity: 1});
    # CartItem.create!({user_id: 5, product_id: 4, quantity: 5});
    # CartItem.create!({user_id: 6, product_id: 2, quantity: 1});

    puts "Done!"
  # end

  product_1.photo.attach(
    io: URI.open("https://barnes-nobel-seeds.s3.amazonaws.com/photo_1.webp"),
    filename: "photo_1.webp"
  )