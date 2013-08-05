#coding: utf-8
class Photo < ActiveRecord::Base
  attr_accessible :title,:album_id,:user_id,:img_path, :is_verify
  belongs_to :album
  belongs_to :user
end
