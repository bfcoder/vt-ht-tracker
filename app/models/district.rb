class District < ActiveRecord::Base
  has_many :sisters

  accepts_nested_attributes_for :sisters
end
