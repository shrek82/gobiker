#coding:utf-8
namespace :gobiker do
  desc "创建相关资源目录"
  task :create_folder => :environment do
    shared_folders = ["images", "uploads","static","uploads/pics","uploads/attacheds"]
    for folder in shared_folders
      # Check to see if it exists
      if File.exists?("#{Rails.root}/public/#{folder}")
        puts "#{Rails.root}/public/#{folder} exists"
      else
        puts "#{Rails.root}/public/#{folder} doesn't exist so we're creating"
        Dir.mkdir "#{Rails.root}/public/#{folder}"
      end
    end
  end

  desc "创建初始管理员账号"
  task :create_manager => :environment do
    if Manager.count==0
      Manager.create(:user=>'admin',:password=>'123456',:email=>'seeyoup@qq.com')
    end
  end
end
