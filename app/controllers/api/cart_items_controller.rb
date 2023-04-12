class Api::CartItemsController < ApplicationController

    def index
        @cart_items = CartItem.where(user_id: params[:user_id])
        render :index
    end

    def show
        @cart_item = CartItem.find(params[:id])
    end

    def create
        # debugger
        @cart_item = CartItem.find_by(user_id: params[:user_id], product_id: params[:product_id])
        
        if @cart_item
            # debugger
            p 'cart item exists'
            # cart item exists, so update quantity
            @cart_item.quantity += params[:quantity]
        else
            # debugger
            p 'cart item does not exist'
            # cart item does not exist, so create new
            @cart_item = CartItem.new(user_id: params[:user_id], product_id: params[:product_id], quantity: params[:quantity])
        end
        # debugger
        if @cart_item.save
            render :show
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def update
        @cart_item = CartItem.find(params[:id]) # find the item
        if @cart_item.update(cart_params)
            render :show
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def destroy
        @cart_item = CartItem.find(params[:id]) # find the item
        if @cart_item.destroy
            head :no_content
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def checkout
        CartItem.where(user_id: current_user.id).destroy_all
        head :no_content
    end

    def add_bulk
        # params[:items].each do |param|
        #     param.permit(:user_id, :product_id, :quantity)
        # end
        # debugger
        CartItem.add_bulk(params[:items])
        p CartItem.all
    end

    private

    def cart_params
        params.require(:cart_item).permit(:user_id, :product_id, :quantity)
    end
end
