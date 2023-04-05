class Api::ProductsController < ApplicationController
    
    def index # just to place items into the store
        # @products = Product.all
        # if (params[:category])
            # @products = Product.where("category=?", params[:category].capitalize)
            # @products = Product.all
            # render :category
        # else
            # @products = Product.select([:id]).group(:category)
            # @products = Product.all
        # end
        @products = Product.all
        render :index
    end

    def show
        @product = Product.find_by(id: params[:id])
        render :show
    end
end
