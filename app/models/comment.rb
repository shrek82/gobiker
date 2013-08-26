#coding: utf-8
class Comment < ActiveRecord::Base
  attr_accessible :content,:place_id,:route_id,:topic_id,:event_id,:album_id,:article_id,:userful_num
  validates_presence_of :content, :message => '不能为空', :text => '内容'
  validates_length_of :content, :minimum => 2
  validates_presence_of :user_id
  belongs_to :place
  belongs_to :user

  after_create :setForumLastcid
  private

  #设置话题最后回复人
  def setForumLastcid
    if self.topic_id
      count=Comment.where(:topic_id => self.topic_id).count
      Topic.find(self.topic_id).update_attributes(:comments_num=>count,:last_comment_user_id=>self.user_id,:last_comment_time=>self.created_at)
    end
  end

end
