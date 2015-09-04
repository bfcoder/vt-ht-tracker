class Household < ActiveRecord::Base
  belongs_to :district
  has_many :visits, dependent: :destroy

  validates :district, presence: true
end
