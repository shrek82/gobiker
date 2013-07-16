#coding:utf-8
class Topic < ActiveRecord::Base
  attr_accessible :club_id, :comments_num, :forum_id, :hits_num, :is_comment, :is_fixed, :is_good, :is_recommend, :last_comment_time, :last_comment_user_id, :last_comment_user_name, :subject_id, :title, :title_color, :user_id,:content
  belongs_to :forum,:foreign_key => "id"
  belongs_to :user

  validates_presence_of :forum_id
  validates_presence_of :user_id
  validates_presence_of :content
  validates_length_of :content,:in => 2..8000

  #可以使用validates组合，组合是可以，但不明了
  #validates :terms, acceptance: true
  #validates :password, confirmation: true
  #validates :username, exclusion: { in: %w(admin superuser) }
  #validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create }
  #validates :age, inclusion: { in: 0..9 }
  #validates :first_name, length: { maximum: 30 }
  #validates :age, numericality: true
  #validates :username, presence: true
  #validates :username, uniqueness: true

  #例如下面
  validates :title,:presence => true,:length => {:in => 3..45,:maximum => 30,:allow_nil => true}, :uniqueness => true

  #自定义验证方法
  validate :cannot_be_robot

  #或随着块一起验证当前记录
  validate do |cur|
    cur.event_topic
  end

  #当touch=>true时,forum改变时，更改topic update_at
  #belongs_to :forum,:touch=>true


  def event_topic
    errors.add(:base, 'Must be friends to leave a comment') unless title.nil?
  end

  private
  def cannot_be_robot
    errors.add(:title, "你一个为一个t就可以了吗") if title=='t'
    errors.add(:title, "哼哼...") if title=='t'
    errors.add(:user_id, "用户不能为空") if user_id.nil?
  end



end
