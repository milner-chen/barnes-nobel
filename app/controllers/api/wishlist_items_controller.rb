class Api::WishlistItemsController < ApplicationController
    wrap_parameters include: WishlistItems.attribute_names

    def index
        @wishlist_items = WishlistItem.where(wishlist_id: params[:wishlist_id])
    end

    def show
        @wishlist_item = WishlistItem.find(params[:id])
    end

    def create
        @wishlist_item = WishlistItem.new(wishlist_item_params)
        if CartItem.find(@wishlist_item.product_id)
            p 'already in cart'
            @wishlist_item.in_cart = true
        else
            p 'not in cart'
            @wishlist_item.in_cart = false
        end

        if @wishlist_item.save
            render :show
        else
            render json: @wishlist_item.errors.full_messages, status: 422
            p @wishlist_item.errors.full_messages
        end
    end
    
    def update
        @wishlist_item = WishlistItem.find(params[:id])
        if CartItem.find(@wishlist_item.product_id)
            p 'already in cart'
            @wishlist_item.in_cart = true
        else
            p 'not in cart'
            @wishlist_item.in_cart = false
        end

        if @wishlist_item.update(wishlist_item_params)
            render :show
        else
            render json: @wishlist_item.errors.full_messages, status: 422
        end
    end

    def destroy
        @wishlist_item = WishlistItem.find(params[:id])
        if @wishlist_item.destroy
            head :no_content
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def wishlist_item_params
        params.require(:wishlist_item).permit(:wishlist_id, :product_id)
    end

end
