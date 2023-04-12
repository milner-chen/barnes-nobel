# == Schema Information
#
# Table name: cart_items
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  product_id :bigint           not null
#  quantity   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CartItem < ApplicationRecord
  validates :user_id, :product_id, :quantity, presence: true

  belongs_to :user
  belongs_to :product

  def self.add_bulk(items)
    items.each do |item|
      curr_item = CartItem.find_by(product_id: item[:product_id], user_id: item[:user_id])
      if curr_item
        curr_item.quantity += item[:quantity]
      else
        curr_item = CartItem.new(item.permit(:user_id, :product_id, :quantity))
      end
      curr_item.save
    end
  end
end
