class InstagramController < ApplicationController
  CALLBACK_URL = 'http://localhost:3000/instagram/oauth/callback'

  def home
  end

  def oauth
    redirect_to Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
  end

  def oauth_callback
    response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
    puts response.access_token
    session[:access_token] = response.access_token
    redirect_to "/instagram/user_likes"
  end

  def user_likes
    client = Instagram.client(:access_token => session[:access_token])
    liked_media =  client.user_liked_media
    liked_media.each do |post|
      post.user_id = 1

    end
    render json: liked_media, layout: false

  end
end
