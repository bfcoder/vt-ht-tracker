class CreateHouseholds < ActiveRecord::Migration
  def change
    create_table :households do |t|
      t.integer :district_id
      t.string :name

      t.timestamps null: false
    end
    add_index :households, :district_id
  end
end
