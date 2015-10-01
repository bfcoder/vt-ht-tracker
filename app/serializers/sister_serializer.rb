class SisterSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :teachers, :visits_complete_ids

  embed :ids
  has_many :visits

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
