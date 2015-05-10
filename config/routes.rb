Rails.application.routes.draw do
  root to: 'visitors#index'
  devise_for :users
  resources :users

  get 'instagram/home', to: 'instagram#home'
  get 'instagram/oauth/connect', to: 'instagram#oauth'
  get 'instagram/oauth/callback', to: 'instagram#oauth_callback'
  get 'instagram/user_likes', to: 'instagram#user_likes'
end
