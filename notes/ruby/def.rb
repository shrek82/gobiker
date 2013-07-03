#coding:utf-8
def myname(limit=6, options={}, &block)
  #puts options.length
  #yield
end

myname 1, :name => "赵建刚", :email => '37294812@qq.com', :ate => 30 do
  #'hello world'
end


def budong(opt={}, flash={})
  flash.each_value do |p|
    puts p
  end
end

budong :action => 'edit', :flash => 'nanjing', :redc => 'hehe', :made => 'made'
