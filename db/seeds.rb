#coding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).ggggggggggggggggggggggggggggggggggggggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhglllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#   rake db:seed

#db:seed

manager=Manager.all
if manager.blank?
  Manager.create(email:'seeyoup@qq.com',name:'admin',password:'1234567',role:'admin')
end

100.times do |i|
Place.create(name: '从余杭到西溪湿地'+i.to_s, content: '你去过就不想再回来了',tags:'风景如画',category_id:1,img_path:'/uploads/pics/201212/22/06521319766_mini.jpg',province_id:330000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
Place.create(name: '龙江到九溪'+i.to_s, content: '你去过就不想再回来了',tags:'休闲',category_id:2,img_path:'/uploads/pics/201212/22/0652151079_mini.jpg',province_id:110000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
Place.create(name: '植物园'+i.to_s, content: '你去过就不想再回来了',tags:'爬行',category_id:3,img_path:'/uploads/pics/201212/22/0652261192_mini.jpg',province_id:310000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
Place.create(name: '茅家埠'+i.to_s, content: '你去过就不想再回来了',tags:'坡路',category_id:1,img_path:'/uploads/pics/201212/22/0652394112_mini.jpg',province_id:330000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
Place.create(name: '余杭径山'+i.to_s, content: '你去过就不想再回来了',tags:'金色秋季',category_id:2,img_path:'/uploads/pics/201212/22/06520022796_mini.jpg',province_id:330000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
Place.create(name: '华家池'+i.to_s, content: '你去过就不想再回来了',tags:'山路',category_id:2,img_path:'/uploads/pics/201212/22/06522321402_mini.jpg',province_id:330000,city_id:1,is_recommended:1,interested_num:32,favorites_num:200,hits_num:532,good_num:643)
#Place.create([{name: '从余杭到西溪湿地'},{name: '从余杭到西溪湿地'},])
#Place.create(:name => '从北京到广州', :content => '为从来没这么愉快过')
end


