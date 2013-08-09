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

    # find first
    Person.find(:first) # returns the first object fetched by SELECT * FROM people
    Person.find(:first, :conditions => ["user_name = ?", user_name])
    Person.find(:first, :conditions => ["user_name = :u", {:u => user_name}])
    Person.find(:first, :order => "created_on DESC", :offset => 5)

    # find last
    Person.find(:last) # returns the last object fetched by SELECT * FROM people
    Person.find(:last, :conditions => ["user_name = ?", user_name])
    Person.find(:last, :order => "created_on DESC", :offset => 5)

    # find by id
    Person.find(1) # returns the object for ID = 1
    Person.find(1, 2, 6) # returns an array for objects with IDs in (1, 2, 6)
    Person.find([7, 17]) # returns an array for objects with IDs in (7, 17)
    Person.find([1]) # returns an array for the object with ID = 1
    Person.find(1, :conditions => "administrator = 1", :order => "created_on DESC")

    # find all
    Person.find(:all) # returns an array of objects for all the rows fetched by SELECT * FROM people
    Person.find(:all, :conditions => ["category IN (?)", categories], :limit => 50)
    Person.find(:all, :conditions => {:friends => ["Bob", "Steve", "Fred"]}
    Person.find(:all, :offset => 10, :limit => 10)
    Person.find(:all, :include => [:account, :friends])
    Person.find(:all, :group => "category")

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

    #where方法
    #第一种是String，相当于直接传入SQL语句，为了防止SQL注入的风险，最好只用于硬编码或变量全部由我们自己控制的SQL语句，千万不要将用户输入的变量值直接放在语句里。
    Subject.where("position = '2' AND name='Second Subject'")

    #第二种是Array，第一个参数和需要写的SQL语句格式完全一样，字段值的地方用?问号代替。后面的参数按照顺序提供条件值。
    Subject.where(["position = ? AND name=?", "2", "Second Subject"])

    #第三种是Hash，每个参数都是一套值对。这种方式非常简单直观，不过有点局限就是表现力有点差，只能表示AND，无法表示OR。
    Subject.where(:position => "2", :name => "Second Subject")

    #所以选择用哪种条件表达式方式就得根据实际情况而定了，一般来说简单的查询使用Hash方式，当复杂性无法满足的时候使用Array型。至于String方式直接写SQL语句的最好还是别用了。
    #查询返回的结果可以当做一个Array使用，如果什么都没查到，返回的长度为0。


    #方法
    Model.where()+first[ | count|]+order(:id)+limit(7)

    #性能差异
    Album.where(:release_year => 1966).count #0.2ms
    Album.find_all_by_release_year(1966).count #0.3ms

    #范围搜索
    Album.where(:release_year => 1960..1966)

    Album.where(:release_year => 1960..1966, :id => 1..5)
    Album.where(:release_year => [1966, 1968])
    Album.where(['release_year=? AND id>?', true, 2])
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

    Place.joins(:user).where();

    #json
    User.find(:all, :limit => 10,
              :joins => "LEFT JOIN `user_points` ON user_points.user_id = users.id",
              :select => "users.*, count(user_points.id)", :group =>
            "user_points.user_id")

    @posts = Place.find(:all,
                        :select => "DISTINCT *",
                        :include => [:user, {:track => :artist}],
                        :conditions => ["user_id IN (?) AND NOT track_id = ?", users, @track.id],
                        :group => "track_id",
                        :order => 'id desc',
                        :form => 'posts p'
    :limit => '5')
  end


  #使用分页查询插件
  def pageation
    Place.paginate(:page => params[:page], :per_page => 10)
    Place.paginate(:page => params[:page], :per_page => 10, :conditions => 'p.is_recommended=1').order('id DESC')
    Place.paginate(:page => params[:page], :per_page => 10, :conditions => ['p.is_recommended=? AND p.id>?', 1, 20]).order('id ASC')
    Place.paginate(:from => 'places p', :page => 1, :per_page => 10, :select => 'p.id,p.name', :conditions => ['p.is_recommended=? AND p.id>?', 1, 20], :joins => 'LEFT JOIN users u on u.id=p.user_id')
    Place.where(:published => true).paginate(:page => params[:page], :per_page => 20).order('id DESC')
  end

  #修改记录
  def editrecord

    Model.where(:foo => 'bar').where(:attr => 1).update_all("author = 'David'")

    # Update all customers with the given attributes
    Customer.update_all :wants_email => true

    # Update all books with 'Rails' in their title
    Book.update_all "author = 'David'", "title LIKE '%Rails%'"

    # Update all avatars migrated more than a week ago
    Avatar.update_all ['migrated_at = ?', Time.now.utc], ['migrated_at > ?', 1.week.ago]

    # Update all books that match conditions, but limit it to 5 ordered by date
    Book.update_all "author = 'David'", "title LIKE '%Rails%'", :order => 'created_at', :limit => 5

    # Conditions from the current relation also works
    Book.where('title LIKE ?', '%Rails%').update_all(:author => 'David')

    # The same idea applies to limit and order
    Book.where('title LIKE ?', '%Rails%').order(:created_at).limit(5).update_all(:author => 'David')

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



    #=>SELECT "places".* FROM "places" INNER JOIN "users" ON "users"."id" = "places"."user_id" WHERE "places"."is_recommended" = 't' LIMIT 3
    #@recommended=Place.select("places.*").joins(:user).recommended.limit(3)

    #=>SELECT user.username FROM "places" LEFT JOIN user ON user.id=place.user_id LIMIT 4
    #@test=Place.select("places.id,places.name").join_user.limit(4)

    #=>SELECT "places".* FROM "places" WHERE "places"."is_fixed" = 't'
    #@fixed=Place.where(:is_fixed => true)

    #@address=Place.select("places.id,places.address").recommended.join_city.limit(6)

    #枚举查询测试
    #@search=Place.base_field.search('华家池', '茅').join_user.join_city.limit(2)
    #=>SELECT places.id,places.name, users.username, provinces.name,cities.name FROM "places" LEFT JOIN users ON users.id=places.user_id LEFT JOIN provinces ON provinces.id=places.province_id LEFT JOIN cities ON cities.id=places.city_id WHERE (places.name like '%华家池%' OR places.name like '%茅%') LIMIT 2


  end

  def keymaptest(abc)
    sdfsdf
  end

  #复杂的查询
  def other
    Place.paginate(:from => 'places p', :page => 1, :per_page => 10, :select => 'p.id,p.name', :conditions => ['p.is_recommended=? AND p.id>?', true, 20], :joins => 'LEFT JOIN users u on u.id=p.user_id', :order => 'p.id DESC').order('p.user_id ASC')
  end
end

