# == Schema Information
#
# Table name: products
#
#  id           :bigint           not null, primary key
#  seller       :string           not null
#  name         :string           not null
#  price        :float            not null
#  description  :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  category_id  :bigint
#  format       :string           not null
#  availability :string           not null
#
class Product < ApplicationRecord
    validates :seller, :name, :price, :description, :category_id, :format, :availability, presence: true
    validates :name, uniqueness: true
    
    belongs_to :category
    
    has_many :cart_items,
    dependent: :destroy

    has_many :wishlist_items,
    dependent: :destroy

    # product has many photos
    has_one_attached :photo # has one row of data
    # has_many_attached :photo # has an arr of data
end
