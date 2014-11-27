class UsersController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource except: [:index]

  def index
    @users = User.all.sort_by {|user| user.email}
    authorize! :manage, @users
  end

  def update
    if user_params[:roles].present? && user_params[:roles].length > 1 && @user.update_attributes(user_params)
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user."
    end
  end

  def destroy
    unless @user == @current_user
      @user.destroy
      redirect_to users_path, :notice => "User deleted."
    else
      redirect_to users_path, :alert => "Can't delete yourself."
    end
  end

  private

  def user_params
    params.require(:user).permit(roles: [])
  end

end
