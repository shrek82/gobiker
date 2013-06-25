#coding: utf-8
class AdminController < ApplicationController

  #helper_method定义的方法可以在试图中使用
  helper_method :current_user, :logged_in?

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
