require 'rails_helper'

RSpec.describe SettingsController, :type => :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET show" do
      it "returns http success" do
        get :show
        expect(response).to have_http_status(:success)
      end
    end

    describe "PUT update" do
      it "updates the requested setting" do
        setting = FactoryGirl.create(:setting)
        expect_any_instance_of(Setting).to receive(:update_attributes).with({ mode: "a name" })
        put :update, {id: setting.id, setting: { mode: "a name" }, format: :json}
      end
    end
  end

end
