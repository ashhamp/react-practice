Rails.application.routes.draw do
  root "bands#index"
  resources :bands, only: [:index, :create, :destroy]

  namespace :api do
    resources :bands, only: [:index, :create, :destroy]
  end
end
