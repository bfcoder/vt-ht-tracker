class Api::VisitsController < ApplicationController
  load_and_authorize_resource except: [:index]

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @visits = Visit.find(params[:ids])
    else
      @visits = Visit.all
    end
    respond_with(@visits)
  end

  def show
    respond_with @visit
  end

  def create
    if @visit.save
      render json: @visit
    else
      render json: {errors: @visit.errors.messages}, status: 422
    end
  end

  def update
    if @visit.update_attributes(visit_params)
      render json: @visit
    else
      render json: {errors: @visit.errors.messages}, status: 422
    end
  end

  def destroy
    if @visit.destroy
      respond_with @visit
    else
      render json: {success: false}, status: 422
    end
  end

  private
    def load_visit
      @visit = Visit.find(params[:id])
    end

    def visit_params
      params.require(:visit).permit(:month, :status, :sister_id)
    end
end
