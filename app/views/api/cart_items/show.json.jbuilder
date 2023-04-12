# json.set! @cart_item.id do
    json.extract! @cart_item, :id, :user_id, :product_id, :quantity
# end