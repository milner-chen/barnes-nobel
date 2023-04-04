class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :seller, null: false
      t.string :name, null: false
      t.float :price, null: false
      t.text :description, null: false
      t.string :category, null: false

      t.timestamps
    end
    add_index :products, :seller
    add_index :products, :name, unique: true
    add_index :products, :category
  end
end
