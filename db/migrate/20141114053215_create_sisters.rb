class CreateSisters < ActiveRecord::Migration
  def change
    create_table :sisters do |t|
      t.string :name, null: false
      t.integer :district_id, null: false

      t.timestamps
    end

    add_index :sisters, :name
    add_index :sisters, :district_id
  end
end
