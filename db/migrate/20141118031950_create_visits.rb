class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.datetime :month
      t.string :status
      t.integer :sister_id

      t.timestamps
    end
    add_index :visits, :month
    add_index :visits, :status
    add_index :visits, :sister_id
  end
end
