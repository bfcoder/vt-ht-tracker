class AddTeachersToHousehold < ActiveRecord::Migration
  def change
    add_column :households, :teachers, :string
  end
end
