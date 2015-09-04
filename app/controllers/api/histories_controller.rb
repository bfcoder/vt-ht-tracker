class Api::HistoriesController < ApplicationController
  load_and_authorize_resource

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      @histories = @histories.find(params[:ids])
    end
    respond_with(@histories)
  end

  def show
    respond_with @history
  end

end
