class Events < ActiveRecord::Base
  attr_accessible :address, :category_id, :club_id, :comments_num, :content, :finish_at, :hits_num, :icon_path, :img_path, :interested_num, :intro, :is_allow_everyone, :is_closed, :is_comment, :is_fixed, :is_recommend, :is_stop_sign, :is_suspend, :sign_finish_at, :sign_limit, :sign_start_at, :signed_num, :start_at, :subject_id, :tags, :title, :title_color, :user_id
end
