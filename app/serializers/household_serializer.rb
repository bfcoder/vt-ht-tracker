class HouseholdSerializer < ActiveModel::Serializer
  attributes :id, :name, :teachers, :visits_complete_ids

  embed :ids
  has_many :visits, include: true

  def visits
    [
      object.visits.where(month: @options[:user_time].beginning_of_month.beginning_of_day - 1.month).first_or_create,
      object.visits.where(month: @options[:user_time].beginning_of_month.beginning_of_day).first_or_create
    ]
  end

  def visits_complete_ids
    object.visits.pluck(:id)
  end
end
