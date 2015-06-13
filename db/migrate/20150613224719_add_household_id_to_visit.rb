class AddHouseholdIdToVisit < ActiveRecord::Migration
  def change
    add_column :visits, :household_id, :integer
    add_index :visits, :household_id
  end
end
