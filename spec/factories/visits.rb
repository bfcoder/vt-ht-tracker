FactoryGirl.define do
  factory :visit do
    month FactoryGirl.generate(:month)
    status FactoryGirl.generate(:status)
    sister
  end

end
