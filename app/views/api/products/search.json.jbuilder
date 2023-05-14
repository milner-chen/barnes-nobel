@products.each do |product|
    json.set! product.id do
        json.extract! product, :id, :seller, :name, :price, :description, :format, :availability, :category_id
        json.photoUrl product.photo.attached? ? product.photo.url : nil
    end
end