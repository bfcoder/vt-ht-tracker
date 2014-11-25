class DistrictSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :sisters

  def sisters
    object.sisters.sort_by {|sister| sister.last_name}
  end
end
