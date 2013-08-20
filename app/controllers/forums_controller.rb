#coding: utf-8
class ForumsController < ApplicationController
  def index
    #公共版块
    #@public=Rails.cache.fetch('forums_index_public', :expires_in => 30.minutes) do
    @public=Forum.where(:is_systemic => true).order('forums.order_num ASC,forums.id ASC')
    @public.each do |f|
      f[:topics_num]=f.topics.count
    end
    #end

    #热门城市
    @hot_cities=Forum.select('forums.*,(select count(topics.id) from topics where topics.forum_id=forums.id) as topics_count').where(:category_id => 2).order('topics_count DESC').limit(12)
    #@hot_cities.each do |f|
    #  f[:topics_num]=f.topics.count
    ##end

  end

  def new
  end

  def create
  end

  def list
  end

  def thread

  end

  #选择论坛发布板块
  def select_forums
    render :template => 'forums/select_forums', :layout => false
  end


end
