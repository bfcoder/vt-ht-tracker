shared_context "a logged in user" do
  before do
    sign_in(@current_user = FactoryGirl.create(:user))
  end
end

shared_context "a logged in admin user" do
  before do
    sign_in(@current_user = FactoryGirl.create(:admin_user))
  end
end
