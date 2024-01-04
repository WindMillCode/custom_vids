class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name address phone date_of_birth gender])
    devise_parameter_sanitizer.permit(:account_update,
                                      keys: %i[first_name last_name address phone date_of_birth gender])
  end
end
