#coding:utf-8
require 'spec_helper'

#before(:each) 每段it之前執行
#before(:all) 整段describe前只執行一次
#after(:each) 每段it之後執行
#after(:all) 整段describe後只執行一次


# 返回一个未保存的用户实例
#user = FactoryGirl.build(:user)

#返回一个已保存的用户实例
#user = FactoryGirl.create(:user)

# 返回一个哈希属性，用于创建用户
#attrs = FactoryGirl.attributes_for(:user)

#返回一个用户对象，清除所有属性值
#stub = FactoryGirl.build_stubbed(:user)

#从块获取对象实例
#FactoryGirl.create(:user) do |user|
#  user.posts.create(attributes_for(:post))
#end

#自定义创建
#user = FactoryGirl.build(:user, username: "Joe")

describe MainController do

#设置缓存
  before(:each) do
    Setting.home_focus_limit=5
    Setting.place_focus_limit=5
    @places = FactoryGirl.create_list :place,10
    FactoryGirl.create :user,:email=>'seeyoup@qq.com'
  end

  context "当用户登录" do

    it '访问网站首页' do
      get :index
      @place=Place.count
      Rails.logger.info '测试数据共有'+@place.to_s
      should respond_with(:success)
    end

  end
end