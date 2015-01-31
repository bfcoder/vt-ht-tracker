FactoryGirl.define do
  factory :visit do
    month FactoryGirl.generate(:month)
    status FactoryGirl.generate(:status)
    notes FactoryGirl.generate(:notes)
    sister
  end

end
