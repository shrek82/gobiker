#coding: utf-8
#Hash------------------------------------
h={:name=>'zhaojiangang',:age=>234}
#fetch方法
#

#输出全部
h.each do |v|
  puts v
end
#=>name
#=>zhaojiangang
#=>age
#=>234

#输出键名
h.each do |key,v|
  puts key
end
#=>name
#=>age

#如果不存在对象会返回一个nil
puts h[:lala].class
#=>NilClass

#可以为hash定义一个默认值
h.default='wohaibuzhidao'
puts h[:lala]

#添加一对值
h.store("a",1)
puts h["a"]
puts h.fetch "a"

#清空
#h.clear

#删除一对
h.delete(:name)

#hash的迭代
#each,each_key,each_value,each_pair(each方法的别名)

#检测Hash中的key，value：
h={:name=>'zhaojiangang',:age=>234}
#检测是否有key：
if h.has_key?(:name)
  puts 'yes,i has'
end

#检测是否有value:
if h.has_value?(:name)
  puts "yes,I has"
end


#合并
h2={:address=>'北京西环'}
p h.merge h2
#=>{:name=>"zhaojiangang", :age=>234, :address=>"\u5317\u4EAC\u897F\u73AF"}

#数组转换为has
arr=%w[a b c d e f g]
#hto = Hash[*arr]
#p hto

#没有a值就使用后面的值
h.fetch('a','bbbbbbb')
h.fetch('a'){'sssssssssss'}
