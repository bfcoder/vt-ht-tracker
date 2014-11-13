FactoryGirl.define do

  sequence :email do |n|
    "somebody#{n}@example.com"
  end

  sequence :login do |n|
    "inquire#{n}"
  end

  sequence :password do |n|
    "password#{n}"
  end

  sequence :name do |n|
    "a_name#{n}"
  end

  sequence :address do |n|
    "#{n} West #{n} South"
  end
end
