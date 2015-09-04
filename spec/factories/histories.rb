FactoryGirl.define do
  factory :history do
    month FactoryGirl.generate(:month)
    status FactoryGirl.generate(:status)
    notes FactoryGirl.generate(:notes)
    visit
  end

end
