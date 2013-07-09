class Threads < ActiveRecord::Base
  attr_accessible :club_id, :comments_num, :forum_id, :hits_num, :is_comment, :is_fixed, :is_good, :is_recommend, :last_comment_time, :last_comment_user_id, :last_comment_user_name, :subject_id, :title, :title_color, :user_id
end
