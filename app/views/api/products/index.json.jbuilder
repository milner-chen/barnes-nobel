@products.each do |product|
    json.set! product.id do
        json.extract! product, :id, :seller, :name, :price, :description, :category_id
    end
end

# @products.each do |product|
#     json.set! product
# end
