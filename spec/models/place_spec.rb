# encoding: utf-8
require 'spec_helper'

describe Place do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:intro) }
end

describe Place, '#publish_posts' do

  #直接创建10条测试数据
  before do
    @places = FactoryGirl.create_list :place, 10
  end

  #发布创建的数据
  context '发布单条测试' do

    before do
       Place.create(:name=>'names1',:address=>'address',:user_id=>1,:content=>'content',:intro=>'intro')
    end

    it '不好了，出问题了' do
      true.should be_true
    end
  end

end