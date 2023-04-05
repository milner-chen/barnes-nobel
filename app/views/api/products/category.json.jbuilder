@products.each do |product|
    json.set! product.category do
        json.array! product.id
    end 
end
