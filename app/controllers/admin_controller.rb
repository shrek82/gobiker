#coding: utf-8
class AdminController < ApplicationController
  before_filter :manager_check
  private
  def manager_check

  end

end
