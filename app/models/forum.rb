#coding: utf-8
class Forum < ActiveRecord::Base
  attr_accessible :name, :order_num,:club_id,:topics_num,:province_id,:city_id,:ico_path,:is_systemic,:category_id
  has_many :topics
end
