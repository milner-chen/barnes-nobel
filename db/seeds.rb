# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Product.destroy_all
    Category.destroy_all
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')
    ApplicationRecord.connection.reset_pk_sequence!('categories')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!( 
      first_name: 'Demo',
      last_name: 'Lition',
      email: 'demo@user.io', 
      password: 'password'
    )
    
    # More users
    10.times do 
      User.create!({
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating categories..."
    5.times do
      Category.create!({
        name: Faker::Book.genre
      })
    end

    puts "Creating products..."
    # create products with seller, name, price, description, category
    50.times do
      Product.create!({
        seller: Faker::Book.author,
        name: Faker::Book.unique.title,
        price: Faker::Commerce.price(range: 0..99.99),
        description: Faker::Lorem.paragraph(sentence_count: 15),
        category_id: Faker::Number.between(from: 1, to: 5)
      })
    end
  
    puts "Done!"
  end