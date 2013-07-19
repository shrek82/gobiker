#手动测试
#bundle exec rspec
#or
#rspec /spec/models

# Run only model specs
#bundle exec rspec spec/models

#使用 rake 命令:
#rake test # 执行所有测试, 也可以用 rake spec, 或直接用 rake
#rake spec:models # 执行 spec/models 下面的测试
#rake spec:helpers # 执行 spec/helpers 下面的测试
#rake spec:requests # 执行 spec/requests 下面的测试 (验收测试)

#rspec spec # 执行 spec 下面的测试, 即执行所有测试
#rspec spec/models # 执行 spec/models 下面的测试
#rspec spec/helpers # 执行 spec/helpers 下面的测试
#rspec spec/requests # 执行 spec/requests 下面的测试 (验收测试)
#rspec spec/lib # 执行 spec/lib 下面的测试
#
#rspec spec/lib/my_app/utility_spec.rb # 只测试一个文件
#rspec spec/lib/my_app/utility_spec.rb:7 # 只执行这个文件第7行所在的单个测试 (每个 "it" 块是一个测试)
#
#rspec spec -t type:request # 执行 type 为 request 的测试, 即验收测试
#rspec spec -t '~type:request' # 执行 type 不是 request 的测试
#
#rspec spec -f d # 指定测试结果的格式为 documentation (文档格式)


#与spork加速
#安装步骤
#
# 1、
# gem 'spork'
# gem 'guard-spork', '0.3.2'

#2、命令:spork --bootstrap将会把spork文件配置增加到spec_helper.rb里面
#3、修改下spec_helper.rb
#4、使用命令“spork”启动spork
#5、另外开一个命令窗口运行"rspce spec/models"
#、怎么样，很快了吧