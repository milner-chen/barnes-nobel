# == Schema Information
#
# Table name: wishlists
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  name        :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Wishlist < ApplicationRecord
  validates :user_id, :name, presence: true
  validates :description, length: { maximum: 250 }
  validates :name, length: { maximum: 30 }

  belongs_to :user

end
