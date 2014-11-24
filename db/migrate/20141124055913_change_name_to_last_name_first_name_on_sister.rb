class ChangeNameToLastNameFirstNameOnSister < ActiveRecord::Migration
  def up
    remove_column :sisters, :name
    add_column :sisters, :first_name, :string
    add_column :sisters, :last_name, :string
  end

  def down
    remove_column :sisters, :last_name
    remove_column :sisters, :first_name
    add_column :sisters, :name, :string, null: false
  end
end
