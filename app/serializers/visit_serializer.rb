class VisitSerializer < ActiveModel::Serializer
  attributes :id, :month, :status, :notes

  embed :ids
  has_one :sister
  has_one :household
  has_many :histories

  def status
    if scope.privileged_user?
      object.status
    else
      nil
    end
  end

  def notes
    if scope.privileged_user?
      object.notes
    else
      nil
    end
  end

  def month
    object.month.strftime("%Y-%m-%d")
  end

  def histories
    if scope.privileged_user?
      object.histories
    else
      []
    end
  end
end
