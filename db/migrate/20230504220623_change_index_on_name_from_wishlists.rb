class ChangeIndexOnNameFromWishlists < ActiveRecord::Migration[7.0]
  def change
    remove_index :wishlists, :name
    add_index :wishlists, [:user_id, :name], unique: true
  end
end
