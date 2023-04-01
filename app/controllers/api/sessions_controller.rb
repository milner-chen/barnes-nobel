class Api::SessionsController < ApplicationController
  def show
    # banana #testing errors
    if current_user
      @user = current_user
      # render json: { user: current_user }
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      # render json: { user: @user }
      render 'api/users/show'
    else
      render json: { errors: ['The email and password combination does not match our records. Please try again.'] }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: { message: 'Successful logout' }
    end
  end

end
