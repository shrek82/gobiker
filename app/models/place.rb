#coding: utf-8
#rails g  migration  add_fieldone_to_place tags:string category_id:integer img_path:string banner_path:string
class Place < ActiveRecord::Base
  default_scope :order=>'id'
  attr_accessible :name,:content,:tags,:category_id,:img_path,:province_id,:city_id,:is_recommended,:interested_num,:favorites_num,:hits_num,:good_num
  validates_presence_of :name,:message => '标题不能为空'
  validates_presence_of :content,:message => '介绍不能为空哦'
  #validates_presence_of :user_id,:message => '作者不能为空'

  has_many :comments
end
