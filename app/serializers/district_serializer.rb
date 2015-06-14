class DistrictSerializer < ActiveModel::Serializer
  attributes :id, :name

  embed :ids
  has_many :sisters
  has_many :households

  def sisters
    object.sisters.sort_by {|sister| sister.last_name}
  end

  def households
    object.households.sort_by {|household| household.name}
  end
end
