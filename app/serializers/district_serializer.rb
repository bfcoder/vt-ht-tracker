class DistrictSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :sisters
end
