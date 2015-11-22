class Api::SettingsController < ApplicationController
  load_and_authorize_resource

  before_action :authenticate_user!

  respond_to :json

  def show
    respond_with @setting
  end
end
