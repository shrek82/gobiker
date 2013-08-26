class RenameEventsToActivity < ActiveRecord::Migration
  def change
    rename_table :events, :activity
  end
end
