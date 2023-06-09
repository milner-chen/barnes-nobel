# == Schema Information
#
# Table name: wishlists
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  name        :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Wishlist < ApplicationRecord
  validates :user_id, :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: "is already in use by another wishlist."}
  validates :description, length: { maximum: 250 }
  validates :name, length: { maximum: 30 }

  belongs_to :user

  has_many :wishlist_items,
  dependent: :destroy
  
end
