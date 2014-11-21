require 'rails_helper'

RSpec.describe Api::SistersController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested sisters" do
        @sister1 = FactoryGirl.create(:sister)
        @sister2 = FactoryGirl.create(:sister)
        @sister3 = FactoryGirl.create(:sister)
        get :index, { format: :json, ids: [@sister1.id, @sister3.id]}
        result = JSON.parse(response.body)
        expect(result['sisters']).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister1.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister2.id}).to_not be_present
        expect(result['sisters'].find{|s| s['id'] == @sister3.id}).to be_present
      end

      it "returns all of the sisters" do
        @sister1 = FactoryGirl.create(:sister)
        @sister2 = FactoryGirl.create(:sister)
        @sister3 = FactoryGirl.create(:sister)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['sisters']).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister1.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister2.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested sister" do
        sister = FactoryGirl.create(:sister)
        get :show, id: sister.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['sister']).to be_present
        expect(result['sister']['id']).to eq(sister.id)
      end
    end

    describe "POST create" do
      it "creates a new Sister" do
        expect {
          post :create, {sister: build_attributes(:sister), format: :json}
        }.to change(Sister, :count).by(1)
      end

      it "returns a newly created sister" do
        post :create, {sister: build_attributes(:sister), format: :json}
        result = JSON.parse(response.body)
        expect(result['sister']).to be_present
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested sister" do
          sister = FactoryGirl.create(:sister)
          expect_any_instance_of(Sister).to receive(:update_attributes).with({ "name" => "a name" })
          put :update, {id: sister.id, sister: { "name" => "a name" }, format: :json}
        end

        it "returns the updated sister" do
          sister = FactoryGirl.create(:sister)
          put :update, {id: sister.to_param, sister: build_attributes(:sister), format: :json}
          result = JSON.parse(response.body)
          expect(result['sister']).to be_present
          expect(Sister.find(result['sister']['id'])).to eq(sister)
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys requested sister" do
        sister = FactoryGirl.create(:sister)
        expect {
          delete :destroy, {id: sister.to_param, format: :json}
        }.to change(Sister, :count).by(-1)
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET index" do
      it "returns all of the requested sisters" do
        @sister1 = FactoryGirl.create(:sister)
        @sister2 = FactoryGirl.create(:sister)
        @sister3 = FactoryGirl.create(:sister)
        get :index, { format: :json, ids: [@sister1.id, @sister3.id]}
        result = JSON.parse(response.body)
        expect(result['sisters']).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister1.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister2.id}).to_not be_present
        expect(result['sisters'].find{|s| s['id'] == @sister3.id}).to be_present
      end

      it "returns all of the sisters" do
        @sister1 = FactoryGirl.create(:sister)
        @sister2 = FactoryGirl.create(:sister)
        @sister3 = FactoryGirl.create(:sister)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['sisters']).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister1.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister2.id}).to be_present
        expect(result['sisters'].find{|s| s['id'] == @sister3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested sister" do
        sister = FactoryGirl.create(:sister)
        get :show, id: sister.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['sister']).to be_present
        expect(result['sister']['id']).to eq(sister.id)
      end
    end

    describe "POST create" do
      it "returns AccessDenied" do
        expect {
          post :create, {sister: build_attributes(:sister), format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "PUT update" do
      it "returns AccessDenied" do
        sister = FactoryGirl.create(:sister)
        expect {
          put :update, {id: sister.id, sister: { "name" => "a name" }, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "DELETE destroy" do
      it "returns AccessDenied" do
        sister = FactoryGirl.create(:sister)
        expect {
          delete :destroy, {id: sister.to_param, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end
  end

end
