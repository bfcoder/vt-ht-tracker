class Api::UsersController < ApplicationController
  before_filter :load_user, only: :show # Only because of the current_user param do I manually have to call this
  load_and_authorize_resource except: [:index]

  before_filter :authenticate_user!

  respond_to :json

  def index
    if params[:ids].present?
      users = User.find(params[:ids]).map { |user| user if user != current_user  }.compact
    else
      users = User.all.map { |user| user if user != current_user  }.compact
    end
    respond_with users
  end

  def show
    if params[:id] == 'current_user'
      respond_with @user, serializer: CurrentUserSerializer
    else
      respond_with @user
    end
  end

  def create
    if @user.save
      render json: @user
    else
      render json: {errors: @user.errors.messages}, status: 422
    end
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user
    else
      render json: {errors: @user.errors.messages}, status: 422
    end
  end

  def destroy
    if @user.destroy
      respond_with @user
    else
      render json: {success: false}, status: 422
    end
  end

  private
  def load_user
    if params[:id] == 'current_user'
      @user = current_user
    else
      @user = User.find(params[:id])
    end
  end

  def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :roles)
    end
end
