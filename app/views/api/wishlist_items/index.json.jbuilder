@wishlist_items.each do |item|
    json.set! list.id do
        json.extract! list, :id, :wishlist_id, :product_id, :in_cart
    end
end