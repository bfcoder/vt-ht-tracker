class HouseholdSerializer < ActiveModel::Serializer
  attributes :id, :name, :teachers, :visits_complete_ids

  embed :ids
  has_many :visits

  def visits_complete_ids
    object.visits.pluck(:id)
  end
end
