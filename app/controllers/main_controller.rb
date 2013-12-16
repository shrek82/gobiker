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
    #总数
    @places_count=Place.getCount
    @topics_count=Topic.count
    @asks_count=Asks.getCount
    #目的地点评
    @reviews_places=Comment.reviewsPlaces(10)
    @focus=Recommend.focus.cat('home').limit(5)
    @hot_place=Place.hot.limit(3)
    #骑行攻略
    @guides=Topic.guides(5)
    #热门板块
    @hot_forums=Forum.hot_forums(5)
    #热门话题
    @hots_topics=Topic.hot(5)

    render :template => 'main/index_v1'
  end
end