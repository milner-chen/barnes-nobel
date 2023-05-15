@wishlist_items.each do |item|
    json.set! item.id do
        json.extract! item, :id, :wishlist_id, :product_id, :in_cart
    end
end