class Api::HouseholdsController < ApplicationController
  load_and_authorize_resource

  before_action :authenticate_user!
  before_action :set_user_time

  respond_to :json

  def index
    if params[:ids].present?
      @households = @households.includes(:visits).find(params[:ids])
    else
      @households = @households.includes(:visits).all
    end
    respond_with(@households, user_time: @user_time)
  end

  def show
    respond_with @household, user_time: @user_time
  end

  def create
    if @household.save
      render json: @household, user_time: @user_time
    else
      render json: {errors: @household.errors.messages}, status: 422
    end
  end

  def update
    if @household.update_attributes(household_params)
      render json: @household, user_time: @user_time
    else
      render json: {errors: @household.errors.messages}, status: 422
    end
  end

  def destroy
    if @household.destroy
      respond_with @household
    else
      render json: {success: false}, status: 422
    end
  end

  private
    def set_user_time
      user_time = request.headers['HTTP_USER_TIME']
      @user_time = Date.parse(user_time) rescue Date.today.in_time_zone("Mountain Time (US & Canada)").to_date
    end

    def load_household
      @household = Household.includes(:visits).find(params[:id])
    end

    def household_params
      params.require(:household).permit(:name, :teachers, :district_id, :status)
    end
end
