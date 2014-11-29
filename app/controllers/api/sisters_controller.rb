class Api::SistersController < ApplicationController
  load_and_authorize_resource except: [:index]

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @sisters = Sister.includes(:visits).find(params[:ids])
    else
      @sisters = Sister.includes(:visits).all
    end
    respond_with(@sisters)
  end

  def show
    respond_with @sister
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
      render json: @sister
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
    def load_sister
      @sister = Sister.includes(:visits).find(params[:id])
    end

    def sister_params
      params.require(:sister).permit(:first_name, :last_name, :district_id)
    end
end
