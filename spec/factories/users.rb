FactoryGirl.define do
  factory :user do
    email { FactoryGirl.generate(:email) }
    password { FactoryGirl.generate(:password) }
    password_confirmation {|u| u.password}

    factory :admin_user do
      roles { |u| ['admin'] }
    end

    factory :visiting_teacher_user do
      roles { |u| ['visiting_teacher'] }
    end
  end

end
