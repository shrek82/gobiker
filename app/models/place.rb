#coding: utf-8
#rails g  migration  add_fieldone_to_place tags:string category_id:integer img_path:string banner_path:string
class Place < ActiveRecord::Base
  default_scope :order=>'id'
  attr_accessible :content, :intro, :name, :user_id,:img_path,:good_num, :been_num, :interested_num, :favorites_num
  validates_presence_of :name,:message => '标题不能为空'
  validates_presence_of :content,:message => '介绍不能为空哦'
  #validates_presence_of :user_id,:message => '作者不能为空'

  has_many :comments
end