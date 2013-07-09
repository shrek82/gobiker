class CreateThreadModerators < ActiveRecord::Migration
  def change
    create_table :thread_moderators do |t|
      t.integer :thread_id
      t.integer :user_id

      t.timestamps
    end
  end
end
