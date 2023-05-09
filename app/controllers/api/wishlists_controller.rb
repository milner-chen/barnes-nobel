class Api::WishlistsController < ApplicationController
    wrap_parameters include: Wishlist.attribute_names

    def index
        @wishlists = Wishlist.where(user_id: params[:user_id])
        render :index
    end

    def show
        @wishlist = Wishlist.find(params[:id])
    end

    def create
        @wishlist = Wishlist.new(wishlist_params)
        if @wishlist.save
            render :show
        else
            render json: @wishlist.errors.full_messages, status: 422
            p @wishlist.errors.full_messages
        end
    end

    def update
        @wishlist = Wishlist.find(params[:id])
        if @wishlist.update(wishlist_params)
            render :show
        else
            render json: @wishlist.errors.full_messages, status: 422
        end
    end

    def destroy
        @wishlist = Wishlist.find(params[:id])
        if @wishlist.destroy
            head :no_content
        else
            render json: @wishlist.errors.full_messages, status: 422
        end
    end

    private

    def wishlist_params
        params.require(:wishlist).permit(:user_id, :name, :description)
    end

end
