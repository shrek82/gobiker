#coding: utf-8
class Attached < ActiveRecord::Base
  attr_accessible :name, :is_verify,
                  :img, :img_content_type, :img_file_name, :img_file_size, :img_updated_at,
                  :att, :att_content_type, :att_file_name, :att_file_size, :att_updated_at

  has_attached_file :img,
                    :styles => {:thumb => "150x150>", :mini => "100x100>", :medium => "300x300>", :large => "600x600>"},
                    :default_url => "/images/:style/missing.png",
                    :url => "/uploads/pics/:year/:month:day/:id_:style.:extension",
                    :path => ":rails_root/public/uploads/pics/:year/:month:day/:id_:style.:extension"
  validates_attachment_content_type :img, :content_type => ['image/gif', 'image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/jpg']

  has_attached_file :att,
                    :url => "/uploads/attacheds/:id/:id_:style.:extension",
                    :path => ":rails_root/public/uploads/attacheds/:id/:id_:style.:extension"
end