require 'rails_helper'

RSpec.describe User, type: :model do
  describe "Roles" do
    before do
      @user = FactoryGirl.create(:user)
    end

    it "sets role of admin" do
      @user.roles = [:admin]
      expect(@user.roles).to eq([:admin])
    end

    it "admin? returns true" do
      @user.roles = [:admin]
      expect(@user.admin?).to eq(true)
    end

    it "sets role of presidency" do
      @user.roles = [:presidency]
      expect(@user.roles).to eq([:presidency])
    end

    it "presidency? returns true" do
      @user.roles = [:presidency]
      expect(@user.presidency?).to eq(true)
    end

    it "sets role of teaching_coordinator" do
      @user.roles = [:teaching_coordinator]
      expect(@user.roles).to eq([:teaching_coordinator])
    end

    it "teaching_coordinator? returns true" do
      @user.roles = [:teaching_coordinator]
      expect(@user.teaching_coordinator?).to eq(true)
    end

    it "sets role of district_leader" do
      @user.roles = [:district_leader]
      expect(@user.roles).to eq([:district_leader])
    end

    it "district_leader? returns true" do
      @user.roles = [:district_leader]
      expect(@user.district_leader?).to eq(true)
    end

    it "sets role of visiting_teacher" do
      @user.roles = [:visiting_teacher]
      expect(@user.roles).to eq([:visiting_teacher])
    end

    it "visiting_teacher? returns true" do
      @user.roles = [:visiting_teacher]
      expect(@user.visiting_teacher?).to eq(true)
    end
  end
end
