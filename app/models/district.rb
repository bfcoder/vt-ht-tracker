class District < ActiveRecord::Base
  has_many :sisters
  has_many :households

  accepts_nested_attributes_for :sisters
  accepts_nested_attributes_for :households
end
