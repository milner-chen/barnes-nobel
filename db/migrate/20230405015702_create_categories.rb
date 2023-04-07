class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :name, null: false

      t.timestamps
    end
    remove_column :products, :category
    add_reference :products, :categories, foreign_key: true
  end
end
