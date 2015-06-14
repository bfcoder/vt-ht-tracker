require 'rails_helper'

RSpec.describe Api::HouseholdsController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested households" do
        @household1 = FactoryGirl.create(:household)
        @household2 = FactoryGirl.create(:household)
        @household3 = FactoryGirl.create(:household)
        get :index, { format: :json, ids: [@household1.id, @household3.id]}
        result = JSON.parse(response.body)
        expect(result['households']).to be_present
        expect(result['households'].find{|s| s['id'] == @household1.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household2.id}).to_not be_present
        expect(result['households'].find{|s| s['id'] == @household3.id}).to be_present
      end

      it "returns all of the households" do
        @household1 = FactoryGirl.create(:household)
        @household2 = FactoryGirl.create(:household)
        @household3 = FactoryGirl.create(:household)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['households']).to be_present
        expect(result['households'].find{|s| s['id'] == @household1.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household2.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested household" do
        household = FactoryGirl.create(:household)
        get :show, id: household.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['household']).to be_present
        expect(result['household']['id']).to eq(household.id)
      end
    end

    describe "POST create" do
      it "creates a new Household" do
        expect {
          post :create, {household: build_attributes(:household), format: :json}
        }.to change(Household, :count).by(1)
      end

      it "returns a newly created household" do
        post :create, {household: build_attributes(:household), format: :json}
        result = JSON.parse(response.body)
        expect(result['household']).to be_present
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested household" do
          household = FactoryGirl.create(:household)
          expect_any_instance_of(Household).to receive(:update_attributes).with({ "name" => "a name" })
          put :update, {id: household.id, household: { "name" => "a name" }, format: :json}
        end

        it "returns the updated household" do
          household = FactoryGirl.create(:household)
          put :update, {id: household.to_param, household: build_attributes(:household), format: :json}
          result = JSON.parse(response.body)
          expect(result['household']).to be_present
          expect(Household.find(result['household']['id'])).to eq(household)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys requested household" do
        household = FactoryGirl.create(:household)
        expect {
          delete :destroy, {id: household.to_param, format: :json}
        }.to change(Household, :count).by(-1)
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET index" do
      it "returns all of the requested households" do
        @household1 = FactoryGirl.create(:household)
        @household2 = FactoryGirl.create(:household)
        @household3 = FactoryGirl.create(:household)
        get :index, { format: :json, ids: [@household1.id, @household3.id]}
        result = JSON.parse(response.body)
        expect(result['households']).to be_present
        expect(result['households'].find{|s| s['id'] == @household1.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household2.id}).to_not be_present
        expect(result['households'].find{|s| s['id'] == @household3.id}).to be_present
      end

      it "returns all of the households" do
        @household1 = FactoryGirl.create(:household)
        @household2 = FactoryGirl.create(:household)
        @household3 = FactoryGirl.create(:household)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['households']).to be_present
        expect(result['households'].find{|s| s['id'] == @household1.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household2.id}).to be_present
        expect(result['households'].find{|s| s['id'] == @household3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested household" do
        household = FactoryGirl.create(:household)
        get :show, id: household.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['household']).to be_present
        expect(result['household']['id']).to eq(household.id)
      end
    end

    describe "POST create" do
      it "returns AccessDenied" do
        expect {
          post :create, {household: build_attributes(:household), format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "PUT update" do
      it "returns AccessDenied" do
        household = FactoryGirl.create(:household)
        expect {
          put :update, {id: household.id, household: { "name" => "a name" }, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "DELETE destroy" do
      it "returns AccessDenied" do
        household = FactoryGirl.create(:household)
        expect {
          delete :destroy, {id: household.to_param, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end
  end

end
