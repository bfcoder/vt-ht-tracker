class AddStatusToPeople < ActiveRecord::Migration
  def change
    add_column :sisters, :status, :boolean, default: true
    add_column :households, :status, :boolean, default: true
    add_index :sisters, :status
    add_index :households, :status
  end
end
