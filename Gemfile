#coding: utf-8
source 'http://ruby.taobao.org/'

gem 'rails', '3.2.13'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'


# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

#sina微博oauth
gem 'weibo_2'

#i18n国际化分页插件
gem 'will_paginate', '~> 3.0'
gem 'will-paginate-i18n'

#基于角色控制的插件
gem "cancan",'~>1.6.7'

#图片和文件上传组件
gem "paperclip", "~> 3.0"

#配置缓存
#这个 Gem 是用来给 ActiveRecord 做设置项存储的，数据保存在数据库里面，读取将会有自动缓存。
gem "rails-settings-cached", "0.2.4"

#开发模式用到的
group :development do
  gem "thin"
  gem "better_errors"
  gem "hirb"
  gem "rails-footnotes", '>= 3.7.9'
  #gem "pry-rails"
end

#针对版本: rails 3.2, ruby 1.9.3

#1、Rails 应用测试策略
#根据我个人的经验, 对于 Rails 应用需要做两方面的测试:
#单元测试: 针对 models, controllers, helpers, mailers 和 lib 下的代码.
#其中对 controllers 的测试不是从集成测试的角度, 而是从 是否可以访问到某些 action 和 action 返回的 JSON 等数据是否正确 两个角度进行测试.
#单元测试属于 白盒测试.
#单元测试的代码位于 spec 文件夹下的同名的子文件夹, 例如 spec/models.
#验收测试: 也叫 集成测试, 是指模拟用户在浏览器的操作, 对网站的功能进行测试.
#验收测试以功能模块为单位进行测试, 例如用户注册, 添加文章等.
#验收测试属于 黑盒测试.
#验收测试的代码位于 spec/requests 文件夹下. (注: Cucumber 更适合用来做验收测试, 请参见续篇: 在 Rails 应用中使用 Cucumber 进行验收测试)
#2、测试工具
#rspec: BDD 测试框架, 替代 Rails 默认的 TestUnit.
#factory_girl: 用于方便的创建测试数据, Rails Test Fixture 的替代品.
#shoulda-matchers: 提供一些方便的测试 rails 应用的验证语句.
#capybara: 验收测试框架, 用于模拟用户操作测试网站功能.
#capybara-webkit: 为 capybara 提供 headless driver, 即在测试时不需要浏览器, 以便在 Linux 持续集成服务器上执行测试.
#launchy: 在使用 capybara 测试时通过 save_and_open_save 方法来在浏览器打开当时状态的页面.
#Database Cleaner: 用于在测试时清理数据库, 因为 capybara 不支持 rspec 默认的 transactional fixtures.
#simplecov: 用于生成测试覆盖率报告.
#zeus: 测试辅助工具, 用于加快执行测试和其他 Rails 命名的启动速度.

group :test, :development do
  gem 'rspec-rails', '~> 2.0'
end

group :test do
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'
  gem 'capybara'
  #gem 'capybara-webkit'
  gem 'launchy'
  gem 'database_cleaner'
  gem 'simplecov', require: false
end


#send mail needattribute
#gem 'tlsmail'

#search gem
#https://github.com/huacnlee/redis-search/wiki/Usage-in-Chinese
#gem 'redis','>= 2.1.1'
#gem 'chinese_pinyin', '0.4.1'
#gem 'rmmseg-cpp-huacnlee', '0.2.9'
#gem 'redis-namespace','~> 1.1.0'
#gem 'redis-search', '0.6.3'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'

#genghao de fenye
#gem 'kaminari', '~> 0.13.0'

#在rails console中Hirb.enable
#richrc: Github / Article – 在rails3中不用修改Gamfile，实现irb格式化和高亮语法
