@categories.each do |category|
    json.set! category.name do
        json.array! category.products.ids
    end
end

# @categories.each do |category|
#     json.set! category.id do
#         json.array! category.products.ids

#     end
# end