FactoryGirl.define do
  factory :sister do
    first_name { FactoryGirl.generate(:name) }
    last_name { FactoryGirl.generate(:name) }
    district
  end

end
