class Guide < ActiveRecord::Base
  attr_accessible :category_id, :comments_num, :content, :hits_num, :img_ids, :img_path, :intro, :is_fixed, :is_recommended, :source, :tags, :title, :useful_num, :user_id
end
