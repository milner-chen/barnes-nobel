json.set! @product.id do
    json.extract! @product, :id, :seller, :name, :price, :description, :category_id
end
