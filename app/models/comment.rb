#coding: utf-8
class Comment < ActiveRecord::Base
  attr_accessible :content,:place_id,:route_id,:bbs_unit_id,:userful_num
  validates_presence_of :content, :message => '不能为空', :text => '内容'
  validates_length_of :content, :minimum => 2
  validates_presence_of :user_id
  belongs_to :place
  belongs_to :user
  private

end
