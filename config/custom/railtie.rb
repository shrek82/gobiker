#自定义配置
module Custom
  class Railtie < Rails::Railtie
    config.custom = ActiveSupport::OrderedOptions.new
  end
end