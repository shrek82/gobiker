#coding:utf-8
class Topic < ActiveRecord::Base
  attr_accessible :subject_id, :title, :title_color, :user_id, :club_id, :comments_num, :activity_id, :forum_id, :hits_num, :is_comment, :is_fixed, :is_good, :is_recommend, :last_comment_time, :last_comment_user_id, :last_comment_user_name
  attr_accessible :content,:activity_data,:post_data,:together_data
  belongs_to :forum, :foreign_key => "forum_id"
  belongs_to :user
  belongs_to :subject_category
  belongs_to :reply_user, :class_name => "User", :foreign_key => "last_comment_user_id"

  has_one :activity
  has_one :together
  has_one :post

  validates_presence_of :forum_id
  validates_presence_of :subject_id
  validates_presence_of :user_id
  validates_length_of :title, :in => 2..60

  #自定义验证方法
  validate :subject_check

  #belongs_to :forum,:touch=>true

  scope :base_field, select("topics.id,topics.title,topics.forum_id,topics.subject_id,topics.user_id,topics.title_color,topics.last_comment_user_id,topics.last_comment_time,topics.hits_num,topics.comments_num,topics.is_fixed,topics.is_good,topics.created_at")

  #创建topic
  after_create :subject_create

  #自定义详情字段
  def content
    @content
  end
  def content=(str)
    @content=str
  end

  #自定义话题字段
  def post_data
    @post_data
  end
  def post_data=(arr)
    @post_data=arr
  end

  #自定义活动字段

  def together_data
    @together_data
  end
  def together_data=(arr)
    @together_data=arr
  end

  def activity_data
    @activity_data
  end
  def activity_data=(arr)
    @activity_data=arr
  end

  private

  #主题验证
  def subject_check
    if self.subject_id==1
      #errors.add(:base, '主题类型为话题') if self.subject_id==1
    elsif self.subject_id==2
    elsif self.subject_id==3
    elsif self.subject_id==4
    end
  end

  def subject_create
    if self.subject_id==1
      post=Post.new()
      post.topic_id=self.id
      post.content=@content
      post.save
    end

    if self.subject_id==2
      together=Together.new(@together_data)
      together.topic_id=self.id
      together.content=@content
      together.save
    end

  end

end
