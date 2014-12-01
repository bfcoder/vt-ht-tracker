class Api::DistrictsController < ApplicationController
  load_and_authorize_resource except: [:index]

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @districts = District.includes(:sisters).find(params[:ids])
    else
      @districts = District.includes(:sisters).all
    end
    respond_with(@districts)
  end

  def show
    respond_with @district
  end

  def create
    if @district.save
      render json: @district
    else
      render json: {errors: @district.errors.messages}, status: 422
    end
  end

  def update
    if @district.update_attributes(district_params)
      render json: @district
    else
      render json: {errors: @district.errors.messages}, status: 422
    end
  end

  def destroy
    if @district.sisters.length == 0 && @district.destroy
      respond_with @district
    else
      render json: {success: false}, status: 422
    end
  end

  private
    def load_district
      @district = District.includes(:sisters).find(params[:id])
    end

    def district_params
      params.require(:district).permit(:name)
    end
end
