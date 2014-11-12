class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ROLES = %i[admin presidency teaching_coordinator district_leader visiting_teacher]

  def admin?
    self.has_role? :admin
  end

  def has_role?(role)
    roles.include?(role)
  end

  # https://github.com/CanCanCommunity/cancancan/wiki/Role-Based-Authorization#many-roles-per-user
  # Basically this is done using a bitmask. http://en.wikipedia.org/wiki/Mask_(computing)
  # There is an integer on the User model.
  # The integer is turned into a binary number and reversed.
  # The resulting binary number is a direct translation of the ROLES.
  # For example: 12 is 1100 in binary,
  # then reversed is 0011 which gives roles teaching_coordinator and district_leader.
  # Roles can be set as an array of strings or an array of symbols.
  # user.roles = [:teaching_coordinator, :district_leader]
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
