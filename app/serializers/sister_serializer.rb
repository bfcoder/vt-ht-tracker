class SisterSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :visits

  def visits
    [object.visits.find_or_create_by(month: Date.today.beginning_of_month - 1.month), object.visits.find_or_create_by(month: Date.today.beginning_of_month)]
  end
end