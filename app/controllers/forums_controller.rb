#coding: utf-8
class ForumsController < ApplicationController
  def index

    #公共版块
    #@public=Rails.cache.fetch('forums_index_public', :expires_in => 30.minutes) do
    @public=Forum.where(:category_id => 1).order('forums.order_num ASC,forums.id ASC')
    @public.each do |f|
      f[:topics_num]=f.topics.count
    end
    #end

    #热门城市
    @hot_cities=Forum.select('forums.*,(select count(topics.id) from topics where topics.forum_id=forums.id) as topics_count').where(:category_id => 2).order('topics_count DESC').limit(12)
    @hot_cities.each do |f|
      f[:topics_num]=f.topics.count
    end

  end

  def list
    @forum= Forum.find(params[:id])
    @topics = Topic.base_field.where(:forum_id => params[:id]).paginate(:page => params[:page], :per_page =>15,:include => [:user,:reply_user],:order=>'topics.is_fixed DESC,case when topics.last_comment_time IS NOT NULL then topics.last_comment_time when topics.last_comment_time IS NULL then topics.created_at end DESC')
  end

  def new
  end

  def create
  end

  def topic

  end

  def thread

  end

  #选择论坛发布板块
  def select_forums
    render :template => 'forums/select_forums', :layout => false
  end


end
