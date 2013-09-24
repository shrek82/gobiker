#coding:utf-8
class Topic < ActiveRecord::Base
  attr_accessible :subject_id, :title, :title_color, :user_id, :club_id, :comments_num, :activity_id, :forum_id, :hits_num, :is_comment, :is_fixed, :is_good, :is_recommend, :last_comment_time, :last_comment_user_id, :last_comment_user_name
  attr_accessible :from_form, :content, :activity_data, :post_data, :together_data
  belongs_to :forum, :foreign_key => "forum_id"
  belongs_to :user
  belongs_to :subject_category, :foreign_key => "subject_id"
  belongs_to :reply_user, :class_name => "User", :foreign_key => "last_comment_user_id"

  has_one :activity
  has_one :together
  has_one :post

  #基本验证
  validates_presence_of :forum_id
  validates_presence_of :subject_id
  validates_presence_of :user_id
  #validates_length_of :title, :in => 2..60

  #保存验证
  validate do
    if self[:from_form]
      if self.subject_id==1
        self.errors.add(:base, '作者不能为空') if self.user_id.blank?
        self.errors.add(:base, '标题不能为空') if self.title.blank?
        self.errors.add(:base, '标题字数不能少于3个字符') if (self.title.blank?)==false && self.title.size<3
        self.errors.add(:base, '内容不能为空') if self.content.blank?
        self.errors.add(:base, '内容字符至少10个字符') if (self.content.blank?)==false && self.content.size<10
      elsif self.subject_id==2
        self.errors.add(:base, '目的地不能为空') if self.together_data['address'].blank?
        self.errors.add(:base, '日期不能为空') if self.together_data['start_at'].blank?
        self.errors.add(:base, '详细说明不能为空') if self.content.blank?
      elsif self.subject_id==3
        self.errors.add(:base, '目的地不能为空') if self.together_data['address'].blank?
        self.errors.add(:base, '日期不能为空') if self.together_data['start_at'].blank?
        self.errors.add(:base, '详细说明不能为空') if self.content.blank?
      end
    end
  end

  #保存验证
  #before_save :topic_before_save

  #创建topic
  after_create :topic_after_create

  #belongs_to :forum,:touch=>true

  scope :base_field, select("topics.id,topics.title,topics.forum_id,topics.subject_id,topics.user_id,topics.title_color,topics.last_comment_user_id,topics.last_comment_time,topics.hits_num,topics.comments_num,topics.is_fixed,topics.is_good,topics.created_at")

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
  def from_form
    @from_form
  end

  def from_form(boolean=false)
    @from_form=boolean
  end

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

  #后续添加
  def topic_after_create
    if self.subject_id==1
      post=Post.new()
      post.topic_id=self.id
      post.content=@content
      post.save
    end

    if self.subject_id==2
      together=Together.new
      together.topic_id=self.id
      together.address=self.together_data['address']
      together.start_at=self.together_data['start_at']
      together.finish_at=self.together_data['finish_at']
      together.content=@content
      together.save
    end

  end

end
