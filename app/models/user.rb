#coding: utf-8

class User < ActiveRecord::Base
  attr_accessible :avatar_path, :email, :login_date, :memo, :password, :pass, :point, :reg_date, :username, :code, :repassword
  has_many :comments, :dependent => :destroy
  has_many :places
  has_many :topics

  #权限控制
  has_and_belongs_to_many :permissions

  before_create :generate_password
  #before_destroy :before_delete_user

  #http://hi.baidu.com/jiazom/item/079c91c3475f0f000bd93a53
  validates_presence_of       :email,:message => "邮箱不能为空!"
  validates_format_of  :email, :message => "邮箱格式不正确!", :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_length_of         :email,:minimum =>3,:maximum =>15,:message => "邮箱长度须为3到15位字母或数字!"
  validates_uniqueness_of   :email,:case_sensitive => false, :message => "该邮箱地址已存在!"

  validates_presence_of       :username,:message => "用户名不能为空!"
  validates_length_of         :username,:minimum =>2,:maximum =>15,:message => "用户长度须为2到15位字母或数字!"
  validates_uniqueness_of   :username,:message => "该用户名已存在!"

  validates_presence_of     :password,  :message =>"密码不能为空!"
  validates_length_of         :password,   :minimum => 6,:message=>"密码长度须为6到16位字母或数字! "
  validates_confirmation_of :password,  :message => "两次密码不一致!"

  validates_presence_of     :code,  :message =>"验证码不能为空!"

  #选用已有的所有的验证程序来验证模型，
  #validates :email, :length => {:in => 1..25}, :uniqueness => true

  #自定义验证方法
  #validate :must_be_friends

  #或随着块一起验证当前记录
  #validate do |cur|
  #  cur.must_be_friends
  #end

  #或
  #validate do
  #  errors.add(:base, "Must be friends to leave a comment") unless commenter.friend_of?(commentee)
  #end

  def code
  end

  def code=(str)
  end

  private

  def must_be_friends
    errors.add(:base, "Must be friends to leave a comment") unless commenter.friend_of?(commentee)
  end


  def before_delete_user
    if comments.empty?
      return true
    else
      errors.add(:base, 'error smsmsmsm')
      return false
    end
  end

  #生成正式密码
  def generate_password
    salt=Array.new(5) { rand(1024).to_s(36) }.join
    self.password=Digest::SHA256.hexdigest(self.password+salt)
  end

end
