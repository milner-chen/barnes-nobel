# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  seller      :string           not null
#  name        :string           not null
#  price       :float            not null
#  description :text             not null
#  category    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Product < ApplicationRecord
    validates :seller, :name, :price, :description, :category, presence: true
    validates :name, uniqueness: true
 
end
