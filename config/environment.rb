#coding: utf-8
# Load the rails application
require File.expand_path('../application', __FILE__)


#缓存自动清理控制器地址
#ps：记得重启你的服务
#Rails::Initializer.run do |config|
#  config.load_paths += %W(#{Rails.root}/app/sweepers)
#end

# Initialize the rails application
Gobiker::Application.initialize!


