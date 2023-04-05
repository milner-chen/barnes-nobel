class RemoveReference < ActiveRecord::Migration[7.0]
  def change
    remove_reference :products, :categories, foreign_key: true
  end
  add_reference :products, :category, foreign_key: true
end
