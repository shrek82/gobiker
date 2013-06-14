#coding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Place.create(name: '从余杭到西溪湿地', content: '你去过就不想再回来了')
Place.create([{name: '从成都到拉萨', content: '美好的旅程从现在开始吧'},
              {name: '从成都到雅恩', content: '美好的旅程从现在开始吧'}
             ])
Place.create(:name => '从北京到广州', :content => '为从来没这么愉快过')
place=Place.new
place.name='美丽的西湖等你来玩'
place.content='美丽杭州欢迎您'
place.save
