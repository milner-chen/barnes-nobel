class DeleteProductIdFromWishlists < ActiveRecord::Migration[7.0]
  def change
    remove_column :wishlists, :product_id
  end
end
