class VisitSerializer < ActiveModel::Serializer
  attributes :id, :month, :status

  has_one :sister
end
