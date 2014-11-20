class DistrictsController < ApplicationController

  respond_to :html

  def index
    @districts = District.all
  end

  def show
    @district = District.find(params[:id])
  end

  def update
    @district = District.find(params[:id])
    if @district.update_attributes(district_params)
      redirect_to district_path(@district)
    else
      redirect_to district_path(@district), alert: @district.errors.full_messages[0]
    end
  end

  def district_params
    params.require(:district).permit(sisters_attributes: [:id, :name, visits_attributes: [:id, :status]])
  end
end
