class Sister < ActiveRecord::Base
  belongs_to :district

  validates :name, presence: true
  validates :district, presence: true
end
