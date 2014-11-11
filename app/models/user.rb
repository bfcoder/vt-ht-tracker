class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # attr_accessible :roles

  ROLES = %i[admin moderator author banned]

  def admin?
    self.has_role? :admin
  end

  def has_role?(role)
    roles.include?(role)
  end

  # https://github.com/CanCanCommunity/cancancan/wiki/Role-Based-Authorization#many-roles-per-user
  def roles=(roles)
    roles = [*roles].map { |r| r.to_sym }
    self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r) }.inject(0, :+)
  end

  def roles
    ROLES.reject do |r|
      ((roles_mask.to_i || 0) & 2**ROLES.index(r)).zero?
    end
  end
end
