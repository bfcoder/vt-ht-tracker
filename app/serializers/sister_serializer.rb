class SisterSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :teachers, :visits_complete_ids

  embed :ids
  has_many :visits

  def visits_complete_ids
    object.visits.pluck(:id)
  end
end
