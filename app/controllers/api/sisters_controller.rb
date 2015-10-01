class Api::SistersController < ApplicationController
  load_and_authorize_resource

  before_action :authenticate_user!
  before_action :set_user_time

  respond_to :json

  def index
    if params[:ids].present?
      @sisters = @sisters.includes(:visits).find(params[:ids])
    else
      @sisters = @sisters.includes(:visits).all
    end
    respond_with(@sisters, user_time: @user_time)
  end

  def show
    respond_with @sister, user_time: @user_time
  end

  def create
    if @sister.save
      render json: @sister
    else
      render json: {errors: @sister.errors.messages}, status: 422
    end
  end

  def update
    if @sister.update_attributes(sister_params)
      render json: @sister, user_time: @user_time
    else
      render json: {errors: @sister.errors.messages}, status: 422
    end
  end

  def destroy
    if @sister.destroy
      respond_with @sister
    else
      render json: {success: false}, status: 422
    end
  end

  private
    def set_user_time
      user_time = request.headers['HTTP_USER_TIME']
      @user_time = DateTime.parse(user_time) rescue DateTime.now.in_time_zone("Mountain Time (US & Canada)")
    end

    def load_sister
      @sister = Sister.includes(:visits).find(params[:id])
    end

    def sister_params
      params.require(:sister).permit(:first_name, :last_name, :teachers, :district_id)
    end
end
