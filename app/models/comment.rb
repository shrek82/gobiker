#coding: utf-8
class Comment < ActiveRecord::Base
  attr_accessible :content, :user_id,:place_id,:route_id,:bbs_unit_id
  validates_presence_of :content, :message => '不能为空', :text => '内容'
  validates_length_of :content, :minimum => 2
  belongs_to :place
  belongs_to :user
end
