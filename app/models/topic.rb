#coding:utf-8
class Topic < ActiveRecord::Base
  attr_accessible :club_id, :comments_num, :forum_id, :hits_num, :is_comment, :is_fixed, :is_good, :is_recommend, :last_comment_time, :last_comment_user_id, :last_comment_user_name, :subject_id, :title, :title_color, :user_id,:content
  belongs_to :forum,:foreign_key => "forum_id"
  belongs_to :user
  belongs_to :reply_user, :class_name => "User", :foreign_key => "last_comment_user_id"

  validates_presence_of :forum_id
  validates_length_of :title,:in => 2..60
  validates_presence_of :user_id
  validates_length_of :content,:in => 2..38000


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
  #validates :title,:presence => true,:length => {:in => 3..60,:allow_nil => true}

  #自定义验证方法
  #validate :cannot_be_robot

  #或随着块一起验证当前记录
  #validate do |cur|
  #  cur.event_topic
  #end

  #当touch=>true时,forum改变时，更改topic update_at
  #belongs_to :forum,:touch=>true

  scope :base_field, select("topics.id,topics.title,topics.forum_id,topics.subject_id,topics.user_id,topics.title_color,topics.last_comment_user_id,topics.last_comment_time,topics.hits_num,topics.comments_num,topics.is_fixed,topics.is_good,topics.created_at")

  after_create do
    self.subject_id=1 unless self.subject_id
    self.is_fixed=false unless self.is_fixed
    self.is_comment=true unless self.is_comment
    self.is_good=false unless self.is_good
    self.is_recommend=true unless self.is_recommend
    self.hits_num=1 unless self.hits_num
    self.comments_num=0 unless self.comments_num
  end

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
