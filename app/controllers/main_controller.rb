#coding:utf-8
  class MainController < ApplicationController

  #cancan验证方式一，认证一个controller中的所有action
  #这里会报错，奇怪了
  #load_and_authorize_resource

  def v1
    #Setting.home_focus_limit
    @focus=Recommend.focus.cat('home').limit(5)
    @hot_place=Place.hot.limit(3)
    #cancan验证方法方式二：认证一个action
    #authorize! :index,:main,nil
    #在控制台可以直接呼出@place进行debug调试了
    #binding.pry
  end

  def index
    @focus=Recommend.focus.cat('home').limit(5)
    @hot_place=Place.hot.limit(3)

    render :template => 'main/index_v1'
  end
end