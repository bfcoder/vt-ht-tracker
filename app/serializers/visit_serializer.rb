class VisitSerializer < ActiveModel::Serializer
  attributes :id, :month, :status

  has_one :sister

  def status
    if scope.admin? || scope.presidency? || scope.teaching_coordinator? || scope.district_leader?
      object.status
    else
      nil
    end
  end
end
