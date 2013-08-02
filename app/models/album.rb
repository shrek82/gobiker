class Album < ActiveRecord::Base
  attr_accessible :club_id, :cover_path, :event_id, :hits_num, :is_close, :is_recommended, :name, :order_num, :pics_num, :place_id, :tags, :user_id
end
