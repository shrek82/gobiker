class AddActivityIdToTopic < ActiveRecord::Migration
  def change
    add_column :topics, :activity_id, :integer
    add_column :activities, :topic_id, :integer
  end
end
