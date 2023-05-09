# == Schema Information
#
# Table name: wishlist_items
#
#  id          :bigint           not null, primary key
#  wishlist_id :bigint           not null
#  product_id  :bigint           not null
#  in_cart     :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class WishlistItem < ApplicationRecord
  validates :wishlist_id, :product_id, :in_cart, presence: true
  validates :product_id, uniqueness: { scope: :wishlist_id, message: "This product is already in this wishlist." }

  belongs_to :wishlist
  belongs_to :product
end
