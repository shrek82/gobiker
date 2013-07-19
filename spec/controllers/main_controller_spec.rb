#coding:utf-8
require 'spec_helper'

describe MainController do
  describe "Root" do

    before do
      Setting.home_focus_limit=5
      Setting.place_focus_limit=5
    end

    it '设置缓存' do
      true
    end

    it '访问网站首页' do
      get :index
      should respond_with(:success)
    end
  end
end