class SettingsController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource

  def show
  end

  def update
    if @setting.update_attributes(setting_params)
      redirect_to setting_path, notice: "Settings updated."
    else
      redirect_to setting_path, alert: "Unable to update settings."
    end
  end

  private

    def setting_params
      params.require(:setting).permit(:mode)
    end
end
