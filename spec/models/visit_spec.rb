require 'rails_helper'

RSpec.describe Visit, type: :model do
  describe "Visit Histories" do
    before do
      @visit = FactoryGirl.create(:visit)
    end

    it "creates a visit history when saved" do
      @visit.month = FactoryGirl.generate(:month)
      @visit.status = FactoryGirl.generate(:status)
      @visit.notes = FactoryGirl.generate(:notes)
      @visit.save
      expect(@visit.histories.count).to eq(2)
      expect(@visit.histories.last.month).to eq(@visit.month)
      expect(@visit.histories.last.status).to eq(@visit.status)
      expect(@visit.histories.last.notes).to eq(@visit.notes)
    end
  end
end
