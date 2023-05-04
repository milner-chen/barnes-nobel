class CreateWishlists < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlists do |t|
      t.references :user, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps
    end
    add_index :wishlists, :name, unique: true
  end
end
