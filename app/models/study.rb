#coding: utf-8
#我创建的学习用的控制器
class Study < ActiveRecord::Base
  attr_accessible :content, :intro, :is_close, :login_at, :name

  #也可以在这里定义默认排序字段
  default_scope order(:id)

  #添加数据的方法
  def add_record

    #create方法,成功返回true
    # 这个通过控制台添加还可以看到SQL语句呢
    User.create(:name => 'Jamie')

    # Create a single new object using the :admin mass-assignment security role
    User.create({:name => 'Jamie', :is_close => true}, :as => :admin)

    # 忽略验证
    User.create({:name => 'Jamie', :is_close => true}, :without_protection => true)

    # 通过数组添加
    User.create([{:name => 'Jamie'}, {:name => 'Jeremy'}])

    # Create a single object and pass it into a block to set other attributes.
    User.create(:name => 'Jamie') do |u|
      u.is_close = false
    end

    # Creating an Array of new objects using a block, where the block is executed for each object:
    User.create([{:name => 'Jamie'}, {:name => 'Jeremy'}]) do |u|
      u.is_close = false
    end

    #语法

    Country.create(:name => 'Germany', :population => 81831000)
    Country.create({:name => 'Germany', :population => 81831000})
    Country.create(:name => 'Germany', :population => 81831000)
    Country.create('name' => 'Germany', 'population' => 81831000)
    Country.create(name: 'Germany', population: 81831000)

    #new方法
    #控制台运行也可以看到SQL语句，成功返回true
    stu=Study.new
    stu.name='zhaojiangang'
    stu.is_close=false
    stu.save

    stu=Study.new(:name => 'Jamie')
    stu.save

    #new_record?
    #添加前先检测是否有重复的，没有则添加返回ture,否则返回false
    stu=Study.new(:name => 'Jamie')
    stu.new_record?
    #
  end

  #查询
  def chaxun
    Study.first
    #=>也不一定是我们要的第一条记录，最好加上order,例如 Country.order(:id).first
    Country.last
    Country.all
    #返回对象数组
    Country.first.class
    #=>Country(id: integer, name: string, population: integer, created_at: datetime, updated_at: datetime)
    Country.all.class
    #=>Country Load (0.3ms)  SELECT "countries".* FROM "countries"
  end

end
