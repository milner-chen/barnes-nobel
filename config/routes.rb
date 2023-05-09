Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # # for testing backend
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] do
      resources :cart_items, only: [:index, :create]
      resources :wishlists, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]

    resources :products, only: [:index, :show]
    resources :categories, only: [:index]

    resources :wishlists, only: [:show, :create, :update, :destroy] do
      resources :wishlist_items, only: [:index]
    end

    resources :wishlist_items, only: [:show, :create, :update, :destroy]

    post '/cart_items/add_bulk', to: 'cart_items#add_bulk', as: 'add_bulk'

    resources :cart_items, only: [:update, :destroy, :show]

    delete '/checkout', to: 'cart_items#checkout', as: 'checkout'

    # GET /api/products?category=
  end

  get '*path', to: "static_pages#frontend_index"

end
