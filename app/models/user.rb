class User < ActiveRecord::Base
  attr_accessible :avatar_path, :email, :login_date, :memo, :password, :point, :reg_date, :username
end
