#ubuntu12.04下安装gem install mysql2报错解决

#On Ubuntu/Debian and other distributions using aptitude:
sudo apt-get install libmysql-ruby libmysqlclient-dev

#On Red Hat/CentOS and other distributions using yum:
sudo yum install mysql-devel

#On Mac OS X with Homebrew:
brew install mysql


#==================================

#ubuntu12.04下 rails 安装 rmagick

#sudo apt-get install ImageMagick
#gem install RMagick 报错
#需要
sudo apt-get install libmagickwand-dev

#还有一个就是rake的时候忽然提示脚本什么错误，需要再有这个才行
gem 'therubyracer'