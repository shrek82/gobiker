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

  cache_sweeper :place_sweeper, :only => [:create,:update,:destroy]

end
