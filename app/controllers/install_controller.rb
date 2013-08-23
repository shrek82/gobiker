#coding: utf-8
#添加一些固定数据

class InstallController < ApplicationController

  include UsersHelper

  def setting
    rec=Recommend.all
    if rec.blank?
      Recommend.create(:name => 'temp', :img_path => '/images/f6b7381ea54496ea1c667308c0d09048.jpg', :category => 'home', :redirect => '/places', :is_close => false)
      Recommend.create(:name => 'temp', :img_path => '/images/07834ff6939d50dc303cfbb3404d6c9a.jpg', :category => 'place', :redirect => '/places', :is_close => false)
      Recommend.create(:name => 'temp', :img_path => '/images/fb4dcc4f8d5cc03502dfe2b29d23dbf9.jpg', :category => 'home', :redirect => '/places', :is_close => false)
      Recommend.create(:name => 'temp', :img_path => '/images/c74db7ecae909c9dd24c4b0168de5175.jpg', :category => 'place', :redirect => '/places', :is_close => false)
      Recommend.create(:name => 'temp', :img_path => '/images/d8547d182c6e6460d7f9eb4c5ce84d54.jpg', :category => 'home', :redirect => '/places', :is_close => false)
    end
  end

  def user
    user=User.all
    if user.blank?
      %w[seeyoup hmily dongbeige zhaojg wanghao meis huahua tiantian xiang dong pei sheng fage lily yaoyao alan donghua xishi qiuyue guifei xiaoqiao].each do |key|
        email=key+'test@qq.com'
        code=generate_activecode(email)
        User.create(:username => key, :email => email, :password => '123456', :avatar_path => '/avatar/up.jpeg', :code => code)
      end
    end
  end

  #添加一些固定板块
  def forum
    forums=Forum.all
    if forums.blank?
      (1..15).each do |i|
        Forum.create(:name => '公共版块'+i.to_s, :intro => '公共交流区', :order_num => i, :category_id => 1, :ico_path => '/images/forum/default.jpg')
      end

      %w[杭州 无锡 苏州 上海 北京].each do |key|
        Forum.create(:name => key, :intro => key+'交流园地', :province_id => '330000', :city_id => '330100', :order_num => 1, :category_id => 2, :ico_path => '/images/forum/ljhk.jpg')
      end

      (1..3).each do |i|
        Forum.create(:name => '俱乐部'+i.to_s, :club_id => 1, :order_num => 1, :category_id => 3, :ico_path => '/images/forum/zj.jpg')
      end

    end

    Forum.where(:id => 2).update_all(:ico_path => '/images/forum/fg.jpg')
    Forum.where(:id => 3).update_all(:ico_path => '/images/forum/jwyl.jpg')
    Forum.where(:id => 4).update_all(:ico_path => '/images/forum/jyt.jpg')
    Forum.where(:id => 5).update_all(:ico_path => '/images/forum/ljhk.jpg')
    Forum.where(:id => 6).update_all(:ico_path => '/images/forum/lxsy.jpg')
    Forum.where(:id => 7).update_all(:ico_path => '/images/forum/ozdg.jpg')
    Forum.where(:id => 8).update_all(:ico_path => '/images/forum/ozjt.jpg')
    Forum.where(:id => 9).update_all(:ico_path => '/images/forum/qyer.jpg')
    Forum.where(:id => 10).update_all(:ico_path => '/images/forum/jnd.jpg')
    Forum.where(:id => 12).update_all(:ico_path => '/images/forum/ldmz.jpg')
    Forum.where(:id => 14).update_all(:ico_path => '/images/forum/mg.jpg')
    Forum.where(:id => 15).update_all(:ico_path => '/images/forum/nbe.jpg')
    Forum.where(:id => 16).update_all(:ico_path => '/images/forum/xxl.jpg')
    Forum.where(:id => 17).update_all(:ico_path => '/images/forum/xy.jpg')
    Forum.where(:id => 18).update_all(:ico_path => '/images/forum/ydnxy.jpg')
    Forum.where(:id => 19).update_all(:ico_path => '/images/forum/zgnd.jpg')
    Forum.where(:id => 20).update_all(:ico_path => '/images/forum/zy.jpg')

  end

  def manager
    manager=Manager.all
    if manager.blank?
      Manager.create(email: 'seeyoup@qq.com', name: 'admin', password: '1234567', role: 'admin')
    end
  end

end
