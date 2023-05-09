@wishlists.each do |wishlist|
    json.set! wishlist.id do
        json.extract! wishlist, :id, :user_id, :name, :description
    end
end