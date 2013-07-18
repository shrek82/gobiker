#coding: utf-8
class AdminController < ApplicationController

  before_filter :logged_in?, :except => [:login]
  #helper_method定义的方法可以在试图中使用
  helper_method :current_user, :logged_in?

  #登陆
  def login
    if request.method=='POST'
      @m=Manager.find_by_name(params[:name])
      if @m.blank?
        respond :action => 'login', :layout => false, :error => '账号不存在，请重新输入'
      elsif @m[:password]!=params[:password]
        respond :action => 'login', :layout => false, :error => '很抱歉，密码错误，请重新输入'
      else
        session[:manager_id]=@m[:id]
        respond :redirect_to => admin_path, :success => '登陆成功!'
      end
    else
      @m=Manager.new
      render :layout => false
    end
  end


  #管理后台框架
  def frame
    render layout: false
  end


  #管理首页
  def dashboard
  end

  #当前用户
  def current_user
    @current_user ||= Manager.find_by_id(session[:manager_id])
  end

  #是否登陆
  def logged_in?
    redirect_to :action => 'login' unless current_user
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
