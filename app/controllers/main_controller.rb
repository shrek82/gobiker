#coding:utf-8
class MainController < ApplicationController

  def indexsssss
    Place.create(name: '从余杭到西溪湿地', content: '你去过就不想再回来了',tags:'风景如画',category_id:1,img_path:'/uploads/pics/201212/22/06521319766_mini.jpg',province_id:330000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
  end

  def test
  end
end