require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do

  describe 'a logged in admin user' do
    include_context 'a logged in admin user'

    describe "GET index" do
      it "returns all of the requested users" do
        user1 = FactoryGirl.create(:user)
        user2 = FactoryGirl.create(:user)
        user3 = FactoryGirl.create(:user)
        get :index, { format: :json, ids: [user1.id, user3.id]}
        result = JSON.parse(response.body)
        expect(result['users']).to be_present
        expect(result['users'].find{|s| s['id'] == user1.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user2.id}).to_not be_present
        expect(result['users'].find{|s| s['id'] == user3.id}).to be_present
      end

      it "returns all of the users" do
        user1 = FactoryGirl.create(:user)
        user2 = FactoryGirl.create(:user)
        user3 = FactoryGirl.create(:user)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['users']).to be_present
        expect(result['users'].find{|s| s['id'] == user1.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user2.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns the requested user" do
        user = FactoryGirl.create(:user)
        get :show, id: user.to_param, format: :json
        result = JSON.parse(response.body)
        expect(result['user']).to be_present
        expect(result['user']['id']).to eq(user.id)
      end

      it "returns the current user" do
        get :show, id: 'current_user', format: :json
        result = JSON.parse(response.body)
        expect(result['user']).to be_present
        expect(result['user']['id']).to eq(@current_user.id)
      end
    end

    describe "POST create" do
      it "creates a new User" do
        expect {
          post :create, {user: attributes_for(:user), format: :json}
        }.to change(User, :count).by(1)
      end

      it "returns a newly created user" do
        post :create, {user: attributes_for(:user), format: :json}
        result = JSON.parse(response.body)
        expect(result['user']).to be_present
      end
    end

    describe "PUT update" do
      it "updates the requested user" do
        user = FactoryGirl.create(:user)
        expect_any_instance_of(User).to receive(:update_attributes).with({ "email" => "an email" })
        put :update, {id: user.id, user: { "email" => "an email" }, format: :json}
      end

      it "returns the updated user" do
        user = FactoryGirl.create(:user)
        put :update, {id: user.to_param, user: build_attributes(:user), format: :json}
        result = JSON.parse(response.body)
        expect(result['user']).to be_present
        expect(result['user']['id']).to eq(user.id)
      end
    end

    describe "DELETE destroy" do
      it "destroys requested user" do
        user = FactoryGirl.create(:user)
        expect {
          delete :destroy, {id: user.to_param, format: :json}
        }.to change(User, :count).by(-1)
      end
    end
  end

  describe 'a logged in visiting_teacher user' do
    include_context 'a logged in visiting_teacher user'

    describe "GET index" do
      it "returns all of the requested users" do
        user1 = FactoryGirl.create(:user)
        user2 = FactoryGirl.create(:user)
        user3 = FactoryGirl.create(:user)
        get :index, { format: :json, ids: [user1.id, user3.id]}
        result = JSON.parse(response.body)
        expect(result['users']).to be_present
        expect(result['users'].find{|s| s['id'] == user1.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user2.id}).to_not be_present
        expect(result['users'].find{|s| s['id'] == user3.id}).to be_present
      end

      it "returns all of the users" do
        user1 = FactoryGirl.create(:user)
        user2 = FactoryGirl.create(:user)
        user3 = FactoryGirl.create(:user)
        get :index, { format: :json }
        result = JSON.parse(response.body)
        expect(result['users']).to be_present
        expect(result['users'].find{|s| s['id'] == user1.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user2.id}).to be_present
        expect(result['users'].find{|s| s['id'] == user3.id}).to be_present
      end
    end

    describe "GET show" do
      it "returns AccessDenied" do
        user = FactoryGirl.create(:user)
        expect {
          get :show, id: user.to_param, format: :json
        }.to raise_error(CanCan::AccessDenied)
      end

      it "returns the current user" do
        get :show, id: 'current_user', format: :json
        result = JSON.parse(response.body)
        expect(result['user']).to be_present
        expect(result['user']['id']).to eq(@current_user.id)
      end
    end

    describe "POST create" do
      it "returns AccessDenied" do
        expect {
          post :create, {user: attributes_for(:user), format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "PUT update" do
      it "returns AccessDenied" do
        user = FactoryGirl.create(:user)
        expect {
          put :update, {id: user.id, user: { "name" => "a name" }, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end

    describe "DELETE destroy" do
      it "returns AccessDenied" do
        user = FactoryGirl.create(:user)
        expect {
          delete :destroy, {id: user.to_param, format: :json}
        }.to raise_error(CanCan::AccessDenied)
      end
    end
  end

end
