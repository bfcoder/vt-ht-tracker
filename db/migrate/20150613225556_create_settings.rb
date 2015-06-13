class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.string :mode

      t.timestamps null: false
    end
  end
end
