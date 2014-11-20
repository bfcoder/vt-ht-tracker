class Sister < ActiveRecord::Base
  belongs_to :district
  has_many :visits

  validates :name, presence: true
  validates :district, presence: true

  accepts_nested_attributes_for :visits
end
