#coding: utf-8
class Photo < ActiveRecord::Base
  attr_accessible :img_path, :is_verify, :title
  attr_accessor :img_path_file_name
  attr_accessor :img_path_content_type
  attr_accessor :img_path_file_size
  attr_accessor :img_path_updated_at
  has_attached_file :img_path, :styles => {:origin=>"800x800>",:medium => "600x600>", :thumb => "250x250>",:mini=>"100x100>" }, :default_url => "/images/:style/missing.png"


end
