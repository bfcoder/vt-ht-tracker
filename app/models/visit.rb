class Visit < ActiveRecord::Base
  belongs_to :sister
  belongs_to :household
end
