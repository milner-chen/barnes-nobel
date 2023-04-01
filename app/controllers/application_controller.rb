class ApplicationController < ActionController::API
    before_action :snake_case_params

    ### testing
    def test
        if params.has_key?(:login)
          login!(User.first)
        elsif params.has_key?(:logout)
          logout!
        end
      
        if current_user
          render json: { user: current_user.slice('id', 'f_name', 'l_name', 'email', 'session_token') }
        else
          render json: ['No current user']
        end
      end
    ###

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def required_logged_in
        unless current_user
            render json: { message: 'Unauthorized' }, status: :unauthorized
        end
    end

    private

    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end
end
