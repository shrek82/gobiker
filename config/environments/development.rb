#coding: utf-8
Gobiker::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local = true

  #允许开发模式下使用缓存
  config.action_controller.perform_caching = true

  #静态页面缓存
  config.action_controller.page_cache_directory = "#{Rails.root}/public/cache"
  config.action_controller.page_cache_extension = ".html"


  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  # Raise exception on mass assignment protection for Active Record models
  config.active_record.mass_assignment_sanitizer = :strict

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  # Do not compress assets
  config.assets.compress = false

  # Expands the lines which load the assets
  config.assets.debug = true


  #fen ge rizhi
  config.logger = Logger.new(config.paths["log"].first, 'daily') # 或 weekly,monthly
  #or
  #config.logger = Logger.new(config.paths["log"].first, 10, 10*1024*1024) # 10 megabytes
end


#如果找不到imagemagick组件，需要指明路径
#Paperclip.options[:command_path] = "/opt/ImageMagick/bin/"