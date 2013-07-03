#coding: utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery

  #捕获所有错误(并提示友好提示)
  #rescue_from Exception do |exception|
  #  Rails.logger.info '%'*100
  #  Rails.logger.info exception.message
  #  #ExceptionMailer.send_message(exception).deliver
  #  Rails.logger.info '%'*100
  #  render :file => "#{Rails.root}/public/500.html", :status => 500,:layout=>false
  #end

  cache_sweeper :place_sweeper, :only => [:create, :update, :destroy]

  #返回成功的消息
  def render_success(data={})
    format=params[:_format]||'html'
    data[:data]||={:status => 1}
    data[:action]||=action_name
    data[:status]||=200
    data[:layout]=true
    data[:layout]=false if request.xhr?
    #有跳转，优先执行跳转
    redirect_to data[:redirect_to], :notice => data[:notice] if data[:redirect_to]
    #根据请求返回不同格式的结果
    if format=='json'
      render :json => data[:data].to_json
    elsif format=='xml'
      render :xml => data[:data].to_xml
    elsif format=='text'
      render :text => data[:text]
    elsif format=='html'
      render action: data[:action],layout:data[:layout],status:data[:status]
    else
      render nothing:true,status:data[:status]
    end
  end

  #返回错误信息
  def render_error(data={})
    if request.xhr?
      render :json => {:error => data[:error]}
    else
      render action: data[:action]
    end
  end

end
