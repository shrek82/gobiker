#coding:utf-8
class TopicsController < ApplicationController

  before_filter :check_logged,:only => [:new,:edit,:update]

  layout 'forums'

  def index
  end

  def new
    @topic=Topic.new
  end

  def edit
  end

  def create
    if request.post?
      @topic=Topic.new(params[:topic])
      @topic[:user_id]=current_uid
      if @topic.save
        respond :redirect_to => show_topics_path(@topic.id), :success => '话题发表成功'
      else
        respond :action => 'new',:error => @topic.errors.full_messages
      end

    end
  end

  def show
    @topic=Topic.find(params[:id])
    @topic.hits_num+=1
    @topic.save
  end

  def update
  end
end
