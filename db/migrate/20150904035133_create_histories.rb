class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.datetime :month
      t.string :status
      t.string :notes
      t.integer :visit_id

      t.timestamps null: false
    end
    add_index :histories, :visit_id
  end
end
