class District < ActiveRecord::Base
  has_many :sisters
  has_many :households
end
