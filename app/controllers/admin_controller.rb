#coding: utf-8
class AdminController < ApplicationController

  before_filter :logged_in?
  #helper_method定义的方法可以在试图中使用
  helper_method :current_user, :logged_in?

  #管理后台框架
  def frame
    render layout: false
  end

  #管理首页
  def dashboard
  end

  def current_user
    @current_user ||= User.find_by_id(session[:user])
  end

  def logged_in?
    current_user != nil
  end

  before_filter :manager_check
  private
  def manager_check
    @benladeng='erqiu'
    @request_media_type=request.media_type
    @request_method=request.method
  end

  def server_ip
    location = request.env["SERVER_ADDR"]
    render :text => "This server hosted at #{location}"
  end

end
