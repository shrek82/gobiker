#coding: utf-8
#rails g  migration  add_fieldone_to_place tags:string category_id:integer img_path:string banner_path:string
class Place < ActiveRecord::Base
  #有这个字段的不管什么时候都有用id排序,很讨厌
  #default_scope :order => 'id'
  #字段白名单，可以通过parrt[:place]
  #会影响rake db:seed数据导入
  attr_accessible :name, :content, :tags, :category_id, :img_path, :province_id, :city_id, :area_id, :address, :is_recommended, :interested_num, :favorites_num, :hits_num, :good_num, :intro, :content

  #黑名单
  #attr_protected :is_recommended, :interested_num, :favorites_num, :hits_num, :good_num

  #不允许为空
  validates_presence_of :name, :message => '标题不能为空', :text => '电风扇地方'
  validates_presence_of :content, :message => '说明不能为空'
  #validates_presence_of :user_id,:message => '作者不能为空'

  #学习笔记
  #不验证
  #Place.save(:validate => false)

  belongs_to :user
  has_one :province
  has_one :city
  has_many :comments

  #获取记录
  def Place.get(options)

  end

  #推荐目的地
  def Place.get_recommended(limit=6,options={})
    def_opt={:where=>["is_recommended=?",true],:order=>'id DESC',:select=>'id,name,img_path'}
    opt=def_opt.merge! options
    Place.select(opt[:select]).where(opt[:where]).limit(limit).order(opt[:order])
  end
end
