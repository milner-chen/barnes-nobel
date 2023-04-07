class AddFormatToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :format, :string, null: false
    add_column :products, :availability, :string, null: false
  end
end
