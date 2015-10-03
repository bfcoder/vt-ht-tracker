class ChangeVisitMonthToDate < ActiveRecord::Migration
  def up
    change_column :visits, :month, :date
  end

  def down
    change_column :visits, :month, :datetime
  end
end
