require 'rails_helper'

RSpec.describe Api::DistrictsController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested districts" do
        @district1 = FactoryGirl.create(:district)
        @district2 = FactoryGirl.create(:district)
        @district3 = FactoryGirl.create(:district)
        get :index, { format: :json, ids: [@district1.id, @district3.id]}
        result = JSON.parse(response.body)
        expect(result['districts']).to be_present
        expect(result['districts'].find{|s| s['id'] == @district1.id}).to be_present
        expect(result['districts'].find{|s| s['id'] == @district2.id}).to_not be_present
        expect(result['districts'].find{|s| s['id'] == @district3.id}).to be_present
      end

      it "returns all of the districts" do
        @district1 = FactoryGirl.create(:district)
        @district2 = FactoryGirl.create(:district)
        @district3 = FactoryGirl.create(:district)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['districts']).to be_present
        expect(result['districts'].find{|s| s['id'] == @district1.id}).to be_present
        expect(result['districts'].find{|s| s['id'] == @district2.id}).to be_present
        expect(result['districts'].find{|s| s['id'] == @district3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested district" do
        district = FactoryGirl.create(:district)
        get :show, id: district.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['district']).to be_present
        expect(result['district']['id']).to eq(district.id)
      end
    end

    describe "POST create" do
      it "creates a new District" do
        expect {
          post :create, {district: build_attributes(:district), format: :json}
        }.to change(District, :count).by(1)
      end

      it "returns a newly created district" do
        post :create, {district: build_attributes(:district), format: :json}
        result = JSON.parse(response.body)
        expect(result['district']).to be_present
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested district" do
          district = FactoryGirl.create(:district)
          expect_any_instance_of(District).to receive(:update_attributes).with({ "name" => "a name" })
          put :update, {id: district.id, district: { "name" => "a name" }, format: :json}
        end

        it "returns the updated district" do
          district = FactoryGirl.create(:district)
          put :update, {id: district.to_param, district: build_attributes(:district), format: :json}
          result = JSON.parse(response.body)
          expect(result['district']).to be_present
          expect(District.find(result['district']['id'])).to eq(district)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys requested district" do
        district = FactoryGirl.create(:district)
        expect {
          delete :destroy, {id: district.to_param, format: :json}
        }.to change(District, :count).by(-1)
      end
    end
  end

end
