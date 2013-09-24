#coding:utf-8
class TopicsController < ApplicationController

  before_filter :check_logged,:only => [:new,:edit,:update]

  layout 'forums'

  def index
  end

  def new
    @topic=Topic.new
    @topic[:subject_id]=1
    @subject_categories=SubjectCategory.order('order_num ASC')
  end

  def edit
  end

  def create
    if request.post?
      @topic=Topic.new(params[:topic])
      @topic[:user_id]=current_uid
      @topic[:from_form]=true
      if @topic.save
        respond :redirect_to => show_topics_path(@topic.id), :success => '话题发表成功'
      else
        respond :action => 'new',:error => @topic.errors
      end

    end
  end

  def show
    @topic=Topic.find(params[:id])
    @topic.hits_num+=1
    @topic.save
    render 'show2'
  end

  def update
  end
end
