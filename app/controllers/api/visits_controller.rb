class Api::VisitsController < ApplicationController
  load_and_authorize_resource

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @visits = @visits.includes(:histories).find(params[:ids])
    elsif params[:district].present? && params[:month].present?
      month = Date.parse(params[:month]) rescue Date.today.in_time_zone("Mountain Time (US & Canada)").to_date
      month = month.beginning_of_month.to_s
      district = District.includes(sisters: [visits: [:histories]], households: [visits: [:histories]]).find(params[:district])
      if params[:setting] == 'visiting_teaching'
        @visits = district.sisters.map do |sister|
          sister.visits.includes(:histories).where(month: month).first_or_create
        end
      elsif params[:setting] == 'home_teaching'
        @visits = district.households.map do |household|
          household.visits.includes(:histories).where(month: month).first_or_create
        end
      else
        @visits = []
      end
    else
      @visits = @visits.includes(:histories).all
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
      params.require(:visit).permit(:month, :status, :sister_id, :notes)
    end
end
