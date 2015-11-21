class DistrictsController < ApplicationController
  before_filter :authenticate_user!
  layout 'districts', only: [:index]

  respond_to :html

  def index
    @districts = District.all
  end
end
