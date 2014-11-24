class CurrentUserSerializer < ActiveModel::Serializer
  root 'user'

  attributes :id, :roles
end
