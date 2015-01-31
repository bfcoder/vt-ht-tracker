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

  sequence :month do |n|
    Date.today.beginning_of_month - n.month
  end

  sequence :status do |n|
    ['visited', 'not_visited', 'other'].sample
  end

  sequence :notes do |n|
    "She needs her lawn mowed in #{n} weeks."
  end
end
