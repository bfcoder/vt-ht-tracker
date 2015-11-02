require 'rails_helper'

RSpec.describe Api::VisitsController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested visits" do
        @visit1 = FactoryGirl.create(:visit)
        @visit2 = FactoryGirl.create(:visit)
        @visit3 = FactoryGirl.create(:visit)
        get :index, { format: :json, ids: [@visit1.id, @visit3.id]}
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to_not be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to be_present
      end

      it "returns all of the visits" do
        @visit1 = FactoryGirl.create(:visit)
        @visit2 = FactoryGirl.create(:visit)
        @visit3 = FactoryGirl.create(:visit)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to be_present
      end

      it "returns for specified district and month" do
        @month = (Date.today-1.week).beginning_of_month.to_date.to_s
        @district = FactoryGirl.create(:district)
        @sister1 = FactoryGirl.create(:sister, district: @district)
        @sister2 = FactoryGirl.create(:sister, district: @district)
        @visit1 = FactoryGirl.create(:visit, month: @month, sister: @sister1)
        @visit2 = FactoryGirl.create(:visit, month: @month, sister: @sister2)
        @visit3 = FactoryGirl.create(:visit, month: @month)
        get :index, { format: :json, district: @district.id, month: @month }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to_not be_present
      end

      it "returns for specified district and month with month not beginning_of_month" do
        @month = (Date.today-1.week).beginning_of_month.to_date.to_s
        @request_month = ((Date.today-1.week).beginning_of_month+1.week).to_date.to_s
        @district = FactoryGirl.create(:district)
        @sister1 = FactoryGirl.create(:sister, district: @district)
        @sister2 = FactoryGirl.create(:sister, district: @district)
        @visit1 = FactoryGirl.create(:visit, month: @month, sister: @sister1)
        @visit2 = FactoryGirl.create(:visit, month: @month, sister: @sister2)
        @visit3 = FactoryGirl.create(:visit, month: @month)
        get :index, { format: :json, district: @district.id, month: @request_month }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to_not be_present
      end

      it "returns for specified district and month with month not beginning_of_month" do
        @month = (Date.today-1.week).beginning_of_month.to_date.to_s
        @request_month = ((Date.today-1.week).beginning_of_month+1.week).to_date.to_s
        @district = FactoryGirl.create(:district)
        @sister1 = FactoryGirl.create(:sister, district: @district)
        @sister2 = FactoryGirl.create(:sister, district: @district)
        @visit1 = FactoryGirl.create(:visit, month: @month, sister: @sister1)
        @visit2 = FactoryGirl.create(:visit, month: @month, sister: @sister2)
        @visit3 = FactoryGirl.create(:visit, month: @month)
        get :index, { format: :json, district: @district.id, month: @request_month }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to_not be_present
      end

      it "creates visits if not found" do
        @month = (Date.today-1.week).beginning_of_month.to_date.to_s
        @request_month = ((Date.today-1.week).beginning_of_month+1.week).to_date.to_s
        @district = FactoryGirl.create(:district)
        @sister1 = FactoryGirl.create(:sister, district: @district)
        @sister2 = FactoryGirl.create(:sister, district: @district)
        get :index, { format: :json, district: @district.id, month: @request_month }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].count).to eq(2)
      end
    end

    describe "GET show" do
      it "returns the requested visit" do
        visit = FactoryGirl.create(:visit)
        get :show, id: visit.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['visit']).to be_present
        expect(result['visit']['id']).to eq(visit.id)
      end

      it "returns the status" do
        visit = FactoryGirl.create(:visit, status: 'visited')
        get :show, id: visit.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['visit']['status']).to eq('visited')
      end
    end

    describe "POST create" do
      it "creates a new Visit" do
        expect {
          post :create, {visit: build_attributes(:visit), format: :json}
        }.to change(Visit, :count).by(1)
      end

      it "returns a newly created visit" do
        post :create, {visit: build_attributes(:visit), format: :json}
        result = JSON.parse(response.body)
        expect(result['visit']).to be_present
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested visit" do
          visit = FactoryGirl.create(:visit)
          expect_any_instance_of(Visit).to receive(:update_attributes).with({ "status" => "a status" })
          put :update, {id: visit.id, visit: { "status" => "a status" }, format: :json}
        end

        it "returns the updated visit" do
          visit = FactoryGirl.create(:visit)
          put :update, {id: visit.to_param, visit: build_attributes(:visit), format: :json}
          result = JSON.parse(response.body)
          expect(result['visit']).to be_present
          expect(Visit.find(result['visit']['id'])).to eq(visit)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys requested visit" do
        visit = FactoryGirl.create(:visit)
        expect {
          delete :destroy, {id: visit.to_param, format: :json}
        }.to change(Visit, :count).by(-1)
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET index" do
      it "returns all of the requested visits" do
        @visit1 = FactoryGirl.create(:visit)
        @visit2 = FactoryGirl.create(:visit)
        @visit3 = FactoryGirl.create(:visit)
        get :index, { format: :json, ids: [@visit1.id, @visit3.id]}
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to_not be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to be_present
      end

      it "returns all of the visits" do
        @visit1 = FactoryGirl.create(:visit)
        @visit2 = FactoryGirl.create(:visit)
        @visit3 = FactoryGirl.create(:visit)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['visits']).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit1.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit2.id}).to be_present
        expect(result['visits'].find{|s| s['id'] == @visit3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested visit" do
        visit = FactoryGirl.create(:visit)
        get :show, id: visit.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['visit']).to be_present
        expect(result['visit']['id']).to eq(visit.id)
      end

      it "does not return the status" do
        visit = FactoryGirl.create(:visit, status: 'visited')
        get :show, id: visit.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['visit']['status']).to eq(nil)
      end
    end

    describe "POST create" do
      it "creates a new Visit" do
        expect {
          post :create, {visit: build_attributes(:visit), format: :json}
        }.to change(Visit, :count).by(1)
      end

      it "returns a newly created visit" do
        post :create, {visit: build_attributes(:visit), format: :json}
        result = JSON.parse(response.body)
        expect(result['visit']).to be_present
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested visit" do
          visit = FactoryGirl.create(:visit)
          expect_any_instance_of(Visit).to receive(:update_attributes).with({ "status" => "a status" })
          put :update, {id: visit.id, visit: { "status" => "a status" }, format: :json}
        end

        it "returns the updated visit" do
          visit = FactoryGirl.create(:visit)
          put :update, {id: visit.to_param, visit: build_attributes(:visit), format: :json}
          result = JSON.parse(response.body)
          expect(result['visit']).to be_present
          expect(Visit.find(result['visit']['id'])).to eq(visit)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys requested visit" do
        visit = FactoryGirl.create(:visit)
        expect {
          delete :destroy, {id: visit.to_param, format: :json}
        }.to change(Visit, :count).by(-1)
      end
    end
  end

end
