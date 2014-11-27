class VisitSerializer < ActiveModel::Serializer
  attributes :id, :month, :status

  has_one :sister

  def status
    if scope.privileged_user?
      object.status
    else
      nil
    end
  end

  def month
    object.month.strftime("%Y-%m-%d")
  end
end
