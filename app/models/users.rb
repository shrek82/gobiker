class Users < ActiveRecord::Base
  attr_accessible :avatar_path, :email, :login_date, :memo, :password, :reg_date, :username
end
