json.set! @product.id do
    json.extract! @product, :id, :seller, :name, :price, :description, :category
end
