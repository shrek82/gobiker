#coding: utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper,CommonHelper

  #多语言版
  before_filter :set_locale
  def set_locale
    # 可以將 ["en", "zh-TW"] 設定為 VALID_LANG 放到 config/environment.rb 中
    if params[:locale] && I18n.available_locales.include?( params[:locale].to_sym )
      session[:locale] = params[:locale]
    end
    I18n.locale = session[:locale] || I18n.default_locale
  end

  #捕获所有错误(并提示友好提示)
  #rescue_from Exception do |exception|
  #  Rails.logger.info '%'*100
  #  Rails.logger.info exception.message
  #  #ExceptionMailer.send_message(exception).deliver
  #  Rails.logger.info '%'*100
  #  render :file => "#{Rails.root}/public/500.html", :status => 500,:layout=>false
  #end


end
