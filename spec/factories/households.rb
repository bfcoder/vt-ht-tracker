FactoryGirl.define do
  factory :household do
    name { FactoryGirl.generate(:name) }
    district
  end

end
