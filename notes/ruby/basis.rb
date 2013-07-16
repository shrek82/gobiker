#coding: utf-8
#判断值是否为空的方法
#
# nil.blank? == true
# false.blank? == true
# [].blank? == true
# {}.blank? == true
# "".blank? == true
# 5.blank? == false
# " ".empty? == false

def validates_each(*attr_names, &block)
  puts attr_names.size
  yield
end

validates_each :name=>'sss',:age=>222,:address=>'dddd' do |a|
  puts a.class
end
