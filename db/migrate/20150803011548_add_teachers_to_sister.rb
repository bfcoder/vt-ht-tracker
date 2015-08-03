class AddTeachersToSister < ActiveRecord::Migration
  def change
    add_column :sisters, :teachers, :string
  end
end
