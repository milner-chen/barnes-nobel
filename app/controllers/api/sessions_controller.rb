class Api::SessionsController < ApplicationController
  def show
    if current_user
      #
      render json: { user: current_user }
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    if @user
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: ['The email and password combination does not match our records. Please try again.'] }, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: 'Successful logout' }
  end

end
