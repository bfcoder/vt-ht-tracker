class SisterSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :visits
end
