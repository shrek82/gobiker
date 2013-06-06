class Place < ActiveRecord::Base
  attr_accessible :content, :intro, :name, :user_id
end
