FactoryGirl.define do
  factory :sister do
    name { FactoryGirl.generate(:name) }
    district
  end

end
