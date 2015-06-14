class Api::HouseholdsController < ApplicationController
  load_and_authorize_resource

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @households = @households.includes(:visits).find(params[:ids])
    else
      @households = @households.includes(:visits).all
    end
    respond_with(@households)
  end

  def show
    respond_with @household
  end

  def create
    if @household.save
      render json: @household
    else
      render json: {errors: @household.errors.messages}, status: 422
    end
  end

  def update
    if @household.update_attributes(household_params)
      render json: @household
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
    def load_household
      @household = Household.includes(:visits).find(params[:id])
    end

    def household_params
      params.require(:household).permit(:name, :district_id)
    end
end
