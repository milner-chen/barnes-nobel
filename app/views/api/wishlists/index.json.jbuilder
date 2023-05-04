@wishlists.each do |wishlist|
    json.set! wishlist.id do
        json.extract! wishlist, :user_id, :name, :description
    end
end