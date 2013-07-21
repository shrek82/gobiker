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
  before(:all) do
    Setting.home_focus_limit=5
    Setting.place_focus_limit=5
    FactoryGirl.create_list :place, 10

    Manager.create!(:name => "up", :password => "123456")

  end

  context "When the user login" do

    it "displays the user's username after successful login" do
      manager = Manager.create!(:name => "admin", :password => "123456")
      u=Manager.find_by_name("admin")
      u.name.should eq('admin')
    end

    it "be truesdfs" do
      true.should be_true
    end
    it "returns 0 for all gutter game" do
      0.should eq(0)
    end

    it 'Browse Home' do
      get :index
      should respond_with(:success)
    end

    it 'Should prompt for password error' do
      visit '/admin/login'
      fill_in "name", :with => "up"
      fill_in "password", :with => "1234567"
      click_button "登陆"
      page.should have_content('密码错误')
    end

    it 'Should open Admin' do
      visit '/admin/login'
      fill_in "name", :with => "up"
      fill_in "password", :with => "1234567"
      click_button "登陆"
      current_path.should ==admin_path
    end

  end
end