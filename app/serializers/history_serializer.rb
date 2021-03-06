class HistorySerializer < ActiveModel::Serializer
  attributes :id, :month, :status, :notes, :created_at

  embed :ids
  has_one :visit

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
end
