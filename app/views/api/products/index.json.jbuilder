@products.each do |product|
    json.set! product.id do
        json.extract! product, :id, :seller, :name, :price, :description, :category
    end 
end
