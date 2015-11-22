FactoryGirl.define do
  factory :setting do
    mode { FactoryGirl.generate(:mode) }
    presidency_message { FactoryGirl.generate(:presidency_message) }
  end

end
