require 'rails_helper'

RSpec.describe Api::SettingsController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET show" do
      it "returns the requested setting" do
        setting = FactoryGirl.create(:setting)
        get :show, id: setting.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['setting']).to be_present
        expect(result['setting']['id']).to eq(setting.id)
        expect(result['setting']['mode']).to eq(setting.mode)
        expect(result['setting']['presidency_message']).to eq(setting.presidency_message)
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET show" do
      it "returns the requested setting" do
        setting = FactoryGirl.create(:setting)
        get :show, id: setting.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['setting']).to be_present
        expect(result['setting']['id']).to eq(setting.id)
        expect(result['setting']['mode']).to eq(setting.mode)
        expect(result['setting']['presidency_message']).to eq(setting.presidency_message)
      end
    end
  end

end
