#coding: utf-8
class AdminController < ApplicationController
  before_filter :manager_check
  private
  def manager_check
    @benladeng='erqiu'
    @request_media_type=request.media_type
    @request_method=request.method
  end

end
