#coding: utf-8
#rails g  migration  add_fieldone_to_place tags:string category_id:integer img_path:string banner_path:string
class Place < ActiveRecord::Base
  default_scope :order => 'id'
  #字段白名单，可以通过parrt[:place]获取post值
  #attr_accessible :name,:content,:tags,:category_id,:img_path,:province_id,:city_id

  #黑名单
  attr_protected :is_recommended, :interested_num, :favorites_num, :hits_num, :good_num

  #不允许为空
  validates_presence_of :name, :message => '标题不能为空', :text => '电风扇地方'
  validates_presence_of :content, :message => '说明不能为空'
  #validates_presence_of :user_id,:message => '作者不能为空'

  #学习笔记
  #不验证
  #Place.save(:validate => false)


  has_many :comments
end
