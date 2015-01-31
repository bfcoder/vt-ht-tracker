class AddNotesToVisit < ActiveRecord::Migration
  def change
    add_column :visits, :notes, :string
  end
end
