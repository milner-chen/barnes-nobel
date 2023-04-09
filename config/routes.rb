Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # # for testing backend
  # post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] do
      resources :cart_items, only: [:index, :create]
    end
    resource :session, only: [:show, :create, :destroy]

    resources :products, only: [:index, :show]
    resources :categories, only: [:index]
    resources :cart_items, only: [:update, :destroy, :show]

    # GET /api/products?category=
  end

  get '*path', to: "static_pages#frontend_index"

end
