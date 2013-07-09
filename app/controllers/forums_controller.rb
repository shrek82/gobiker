#coding: utf-8
class ForumsController < ApplicationController
  def index
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
    render :template => 'forums/select_forums',:layout => false
  end


end
