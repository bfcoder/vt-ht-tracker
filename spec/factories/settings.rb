FactoryGirl.define do
  factory :setting do
    mode { FactoryGirl.generate(:name) }
  end

end
