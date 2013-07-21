#coding: utf-8
#rails g  migration  add_fieldone_to_place tags:string category_id:integer img_path:string banner_path:string
class Place < ActiveRecord::Base
  #有这个字段的不管什么时候都有用id排序,很讨厌
  #default_scope :order => 'id'
  #字段白名单，可以通过parrt[:place]
  #会影响rake db:seed数据导入
  attr_accessible :name, :content, :tags, :category_id, :img_path,:img_ids, :province_id, :city_id, :area_id, :address, :is_recommended, :interested_num, :favorites_num, :hits_num, :good_num, :intro, :content,:user_id

  #黑名单
  #attr_protected :is_recommended, :interested_num, :favorites_num, :hits_num, :good_num

  #不允许为空
  validates_presence_of :name, :message => '不能为空', :text => '标题'
  validates_presence_of :content, :message => '不能为空'
  validates_presence_of :address, :message => '不能为空', :text => '地址'
  validates_presence_of :intro, :message => '不能为空', :text => '地址'
  validates_length_of :name, :in => (2..30),:message=>'不能少于2个字符'
  validates_length_of :intro, :maximum => 250


  #validates_format_of :name, :with => /^[\w\.]+$/,
  #一般查询预览字段
  scope :base_field,select("places.id,places.name,place.img_path,place.rating")
  #范围快捷设置
  scope :recommended,where(:is_recommended=>true)
  #用户信息
  scope :join_user,select("users.username").joins("LEFT JOIN users ON users.id=places.user_id")
  #地址位置信息
  scope :join_city,select("provinces.name,cities.name").joins("LEFT JOIN provinces ON provinces.id=places.province_id LEFT JOIN cities ON cities.id=places.city_id")
  #查询
  scope :search, lambda { |k,a| where('places.name like ? OR places.name like ?', "%#{k}%","%#{a}%") }
  #热门目的地
  scope :hot,order('hits_num DESC')

  #还可以这样追加model的方法
  def self.fixed
    where(:is_fixed=>true)
  end

  #学习笔记
  #不验证
  #Place.save(:validate => false)

  belongs_to :user
  has_one :province
  has_one :city
  has_many :comments
  has_and_belongs_to_many :tags

  #获取记录
  def Place.get(*args)
    options = args.extract_options!
    puts "Arguments:  #{args.inspect}"
    puts "Options:    #{options.inspect}"
    get(1, 2)
    get(1, 2, :a => :b)
  end

  #推荐目的地
  def Place.get_recommended(limit=6,options={})
    def_opt={:where=>["is_recommended=?",true],:order=>'id DESC',:select=>'id,name,img_path'}
    opt=def_opt.merge! options
    Place.select(opt[:select]).where(opt[:where]).limit(limit).order(opt[:order])
  end
end
