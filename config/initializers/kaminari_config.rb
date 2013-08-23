if defined?(Kaminari)
  Kaminari.configure do |config|
    config.default_per_page = 15
    config.window = 4
    config.outer_window = 0
    config.left = 0
    config.right = 0
    config.page_method_name = :kpage
    config.param_name = :page
  end
end

