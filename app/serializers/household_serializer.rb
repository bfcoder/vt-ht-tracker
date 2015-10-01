class HouseholdSerializer < ActiveModel::Serializer
  attributes :id, :name, :teachers, :visits_complete_ids

  embed :ids
  has_many :visits, include: true

  def visits
    [
      object.visits.find_or_create_by(month: @options[:user_time].beginning_of_month.beginning_of_day - 1.month),
      object.visits.find_or_create_by(month: @options[:user_time].beginning_of_month.beginning_of_day)
    ]
  end

  def visits_complete_ids
    object.visits.pluck(:id)
  end
end
