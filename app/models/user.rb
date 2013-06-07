class User < ActiveRecord::Base
  attr_accessible :avatar_path, :email, :login_date, :memo, :password, :point, :reg_date, :username

  #http://hi.baidu.com/jiazom/item/079c91c3475f0f000bd93a53
  #validates_presence_of       :email,  :message => "邮箱不能为空!"
  #validates_length_of         :email, :minimum => 4,   :message => "邮箱长度须为4到20位字母或数字!"
  #validates_uniqueness_of   :login,:case_sensitive => false, :message => "该用户名已存在!"

  #validates_presence_of     :password,  :message =>"密码不能为空!"
  #validates_length_of         :password,   :minimum => 6,:message=>"密码长度须为6到20位字母或数字! "
  #validates_presence_of     :password_confirmation,  :message =>"请再输入一次密码!"
  #validates_confirmation_of :password,  :message => "两次密码不一致!"
  #validates_format_of  :email, :message => "邮箱格式不正确!", :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
end
