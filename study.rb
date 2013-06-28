#coding: utf-8
#我创建的学习用的控制器
#判断值是否为空的方法
#
# nil.blank? == true
# false.blank? == true
# [].blank? == true
# {}.blank? == true
# "".blank? == true
# 5.blank? == false
# " ".empty? == false

#其他学习
=begin
    可以找到命名空间spec下的所有命令，如： rake spec, rake spec:controllers ...
rake about              # 列出版本的所有Rails框架和ENV...
rake assets:clean       # 删除编译资产
rake assets:precompile  # Compile all the assets named in config.assets.pre...
rake db:create          # Create the database from DATABASE_URL or config/d...
rake db:drop            # Drops the database using DATABASE_URL or the curr...
rake db:fixtures:load   # Load fixtures into the current environment's data...
rake db:migrate         # Migrate the database (options: VERSION=x, VERBOSE...
rake db:migrate:status  # Display status of migrations
rake db:rollback        # Rolls the schema back to the previous version (sp...
rake db:schema:dump     # Create a db/schema.rb file that can be portably u...
rake db:schema:load     # Load a schema.rb file into the database
rake db:seed            # Load the seed data from db/seeds.rb
rake db:setup           # Create the database, load the schema, and initial...
rake db:structure:dump  # Dump the database structure to db/structure.sql
rake db:version         # Retrieves the current schema version number
rake doc:app            # Generate docs for the app -- also available doc:r...
rake log:clear          # Truncates all *.log files in log/ to zero bytes
rake middleware         # Prints out your Rack middleware stack
rake notes              # Enumerate all annotations (use notes:optimize, :f...
rake notes:custom       # Enumerate a custom annotation, specify with ANNOT...
rake rails:template     # Applies the template supplied by LOCATION=(/path/...
rake rails:update       # Update configs and some other initially generated...
rake routes             # Print out all defined routes in match order, with...
rake secret             # Generate a cryptographically secure secret key (t...
rake stats              # Report code statistics (KLOCs, etc) from the appl...
rake test               # Runs test:units, test:functionals, test:integrati...
rake test:recent        # Run tests for {:recent=>"test:prepare"} / Test re...
rake test:single        # Run tests for {:single=>"test:prepare"}
rake test:uncommitted   # Run tests for {:uncommitted=>"test:prepare"} / Te...
rake time:zones:all     # Displays all time zones, also available: time:zon...
rake tmp:clear          # Clear session, cache, and socket files from tmp/ ...
rake tmp:create         # Creates tmp directories for sessions, cache, sock...

与db有关的rake任务

db:charset 检索当前环境下数据库的字符设置
db:collation 检索当前环境下数据库的校对
db:create 用config\database.yml中的定义创建当前 RAILS_ENV 项目环境下的数据库
db:create:all 用config\database.yml中的定义创建所有数据库
db:drop 删除当前 RAILS_ENV项目环境中的数据库
db:drop:all 删除所有在 config\database.yml中定义的数据库
db:reset 从db\schema.rb中为当前环境重建数据库（先删后建）.
db:rollback 回滚(清华出版社一本SQLSERVER书的名词[很奇怪为什么不直接用滚回])数据库到前一个版本. 指定回滚到哪一步要用 STEP=n 参数
db:version 检索当前模式下的版本

=end


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
    Person.find(:first, :conditions => [ "user_name = ?", user_name])
    Person.find(:first, :conditions => [ "user_name = :u", { :u => user_name }])
    Person.find(:first, :order => "created_on DESC", :offset => 5)

    # find last
    Person.find(:last) # returns the last object fetched by SELECT * FROM people
    Person.find(:last, :conditions => [ "user_name = ?", user_name])
    Person.find(:last, :order => "created_on DESC", :offset => 5)

    # find by id
    Person.find(1)       # returns the object for ID = 1
    Person.find(1, 2, 6) # returns an array for objects with IDs in (1, 2, 6)
    Person.find([7, 17]) # returns an array for objects with IDs in (7, 17)
    Person.find([1])     # returns an array for the object with ID = 1
    Person.find(1, :conditions => "administrator = 1", :order => "created_on DESC")

    # find all
    Person.find(:all) # returns an array of objects for all the rows fetched by SELECT * FROM people
    Person.find(:all, :conditions => [ "category IN (?)", categories], :limit => 50)
    Person.find(:all, :conditions => { :friends => ["Bob", "Steve", "Fred"] }
    Person.find(:all, :offset => 10, :limit => 10)
    Person.find(:all, :include => [ :account, :friends ])
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

    #json
    User.find(:all, :limit => 10,
              :joins => "LEFT JOIN `user_points` ON user_points.user_id = users.id" ,
              :select => "users.*, count(user_points.id)", :group =>
            "user_points.user_id")

    @posts = Place.find(:all,
                       :select => "DISTINCT *",
                       :include => [:user, {:track => :artist}],
                       :conditions => ["user_id IN (?) AND NOT track_id = ?", users, @track.id],
                       :group => "track_id",
                       :order => 'id desc',
                       :form =>'posts p'
                       :limit => '5')
  end



  #使用分页查询插件
  def pageation
    Place.paginate(:page => params[:page], :per_page => 10)
    Place.paginate(:page => params[:page], :per_page => 10,:conditions =>'p.is_recommended=1').order('id DESC')
    Place.paginate(:page => params[:page], :per_page => 10,:conditions =>['p.is_recommended=? AND p.id>?',1,20]).order('id ASC')
    Place.paginate(:from=>'places p',:page => 1, :per_page => 10,:select=>'p.id,p.name',:conditions =>['p.is_recommended=? AND p.id>?',1,20],:joins=>'LEFT JOIN users u on u.id=p.user_id')
    Place.where(:published => true).paginate(:page => params[:page], :per_page => 20).order('id DESC')
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

  def keymaptest(abc)
    sdfsdf
  end

  #复杂的查询
  def other
    Place.paginate(:from=>'places p',:page => 1, :per_page => 10,:select=>'p.id,p.name',:conditions =>['p.is_recommended=? AND p.id>?',true,20],:joins=>'LEFT JOIN users u on u.id=p.user_id',:order=>'p.id DESC').order('p.user_id ASC')
  end
end

=begin

RAILS_ENV=production rake db:create db:schema:load

:binary
:boolean
:date
:datetime
:decimal
:float
:integer
:primary_key
:string
:text
:time
:timestamp
$ rails generate migration AddPartNumberToProducts part_number:string
$ rails generate migration RemovePartNumberFromProducts part_number:string
$ rails generate migration AddDetailsToProducts part_number:string price:decimal
rails generate scaffold routes title:string short_title:string tags:string category_id:integer user_id:integer img_path:string banner_path:string province_id:integer city_id:integer duration:integer distance:integer starting:string destination:string intro:string content:text source:string been_num:integer interested_num:integer favorites_num:integer hits_num:integer good_num:integer along_the_scenic:string is_recommended:boolean is_fixed:boolean recommendation_index:integer landscape_index:integer road_index:integer map:string
rails g scaffold Users username:string password:string email:string reg_date:datetime login_date:datetime avatar_path:string point:integer memo:string -f
=end