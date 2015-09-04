require 'rails_helper'

RSpec.describe Api::HistoriesController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested histories" do
        @history1 = FactoryGirl.create(:history)
        @history2 = FactoryGirl.create(:history)
        @history3 = FactoryGirl.create(:history)
        get :index, { format: :json, ids: [@history1.id, @history3.id]}
        result = JSON.parse(response.body)
        expect(result['histories']).to be_present
        expect(result['histories'].find{|s| s['id'] == @history1.id}).to be_present
        expect(result['histories'].find{|s| s['id'] == @history2.id}).to_not be_present
        expect(result['histories'].find{|s| s['id'] == @history3.id}).to be_present
      end

      it "returns all of the histories" do
        @history1 = FactoryGirl.create(:history)
        @history2 = FactoryGirl.create(:history)
        @history3 = FactoryGirl.create(:history)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['histories']).to be_present
        expect(result['histories'].find{|s| s['id'] == @history1.id}).to be_present
        expect(result['histories'].find{|s| s['id'] == @history2.id}).to be_present
        expect(result['histories'].find{|s| s['id'] == @history3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested history" do
        history = FactoryGirl.create(:history)
        get :show, id: history.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['history']).to be_present
        expect(result['history']['id']).to eq(history.id)
      end

      it "returns the status" do
        history = FactoryGirl.create(:history, status: 'visited')
        get :show, id: history.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['history']['status']).to eq('visited')
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET index" do
      it "returns access denied" do
        @history1 = FactoryGirl.create(:history)
        @history2 = FactoryGirl.create(:history)
        @history3 = FactoryGirl.create(:history)
        expect { get :index, { format: :json, ids: [@history1.id, @history3.id] } }.to raise_error(CanCan::AccessDenied)
      end

      it "returns access denied" do
        @history1 = FactoryGirl.create(:history)
        @history2 = FactoryGirl.create(:history)
        @history3 = FactoryGirl.create(:history)
        expect { get :index, { format: :json } }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "GET show" do
      it "returns access denied" do
        history = FactoryGirl.create(:history)
        expect { get :show, id: history.to_param, format: :json }.to raise_error(CanCan::AccessDenied)
      end
    end
  end

end
