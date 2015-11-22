class AddMessageToSetting < ActiveRecord::Migration
  def change
    add_column :settings, :presidency_message, :string, limit: 10000
  end
end
