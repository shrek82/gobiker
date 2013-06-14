class Comment < ActiveRecord::Base
  attr_accessible :content, :user_id,:place_id,:route_id,:bbs_unit_id
  belongs_to :place
  belongs_to :user
end
