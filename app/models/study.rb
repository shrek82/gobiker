#coding: utf-8
#我创建的学习用的控制器
class Study < ActiveRecord::Base
  attr_accessible :content, :intro, :is_close, :login_at, :name

  #也可以在这里定义默认排序字段
  default_scope order(:id)

  #填充数据
  #rake db:seed
  def seed
    country_list = [
        ["Germany", 81831000],
        ["France", 65447374],
        ["Belgium", 10839905],
        ["Netherlands", 16680000]
    ]

    country_list.each do |name, population|
      Country.create(name: name, population: population)
    end
  end

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

  #查询建议使用where，find在4.0可能被遗弃
  #where使用的是lazy loading(延迟加载)，永远不会出错性能和find略有差异
  def seading
    #判断是否存在id=50的记录
    Album.exists?(50)

    #使用find_by总是会返回一个数组
    Album.where(:release_year => 1966).first #0.1ms
    Album.find_by_release_year(1966) #0.3ms
    Album.where(:release_year => 1966).last #0.3ms
    Album.find_last_by_release_year(1966) #0.3ms
    Album.find_by_id_and_release_year(1, 1967)
    Album.find_all_by_id_and_release_year(1, 1967)
    Album.find_by_id_and_name(5, 'The Beatles')

    #不存在记录时自动创建
    #一个非有效的记录不会被保存由find_or_create_by_*！
    Album.find_or_create_by_name('The Beatles')
    #查询时加入潜在插入值
    Album.find_or_create_by_name('Genius Loves Company', :release_year => 2004)

    #find_or_initialize不会创建，需要继续save
    i_got_a_woman = Album.find_or_initialize_by_name('I Got a Woman', :release_year => 1955)
    i_got_a_woman.save

    #性能差异
    Album.where(:release_year => 1966).count #0.2ms
    Album.find_all_by_release_year(1966).count #0.3ms

    #范围搜索
    Album.where(:release_year => 1960..1966)

    Album.where(:release_year => 1960..1966, :id => 1..5)
    Album.where(:release_year => [1966, 1968])

    Album.where(:release_year => [1966, 1968]).first

    #SQL语句查询
    #将值用?表示，可以有效的防止SQL注入
    Album.where('name like ?', '%on%')
    Album.where('name like ? AND release_year > ?', '%on%', 1970).count

    #值为一个变量
    Album.where('name like ?', "%#{search_string}%").count

    #排序
    #order and reverse_order
    Album.where(:release_year => 1960..1969).order(:name)
    Album.where(:release_year => 1960..1969).order(:name).reverse_order

    #limit
    Album.where(:release_year => 1960..1969).limit(5)
    Album.limit(2)

    #offset
    Album.limit(2).offset(5)

    #group
    Album.group(:release_year)

    #pluck
    #指定搜索的字段
    Album.where(:release_year => 1960..1969).pluck(:name)

    #计算平均值
    Album.average(:release_year)
    Album.where(:release_year => 1960..1969).average(:release_year)
    Album.where(:release_year => 1960..1969).average(:release_year).to_s

    #最大最小
    Album.maximum(:release_year)
    Album.minimum(:release_year)

    #总和
    Album.sum(:release_year)

    #explain调试，可以看到用了什么索引
    Album.where(:release_year => 1960..1969).explain
  end

  #使用分页查询插件
  def pageation
    Post.where(:published => true).paginate(:page => params[:page],:per_page => 20).order('id DESC')
  end

  #修改记录
  def editrecord
    #简单的修改
    album = Album.where(:name => 'The Beatles').first
    album.name = 'A Test'
    album.save

    #查看查询结果是否被修改
    album = Album.last
    album.changed? #false
    album.name='new name'
    album.changed? #true

    #修改并保存
    album = Album.last
    album.update_attributes(:name => 'Another Test')

    #一气呵成（查询并修改）
    Album.where(:name => 'Another Test').first.update_attributes(:name => 'The Beatles')

    
  end

end
