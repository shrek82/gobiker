class CeshiController < ApplicationController
  def index
    #require 'base64'
    render :text => Common.activecode("37294812")
    #render :text =>Base64.encode64('37294812@qq.com')
    #render('users/_reg_input_mail',:layout => false)
  end
end
