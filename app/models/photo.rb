#coding: utf-8
class Photo < ActiveRecord::Base
  attr_accessible :img_path, :is_verify, :title
  has_attached_file :img_path,
                    :styles => {:thumb => "200x200>",:mini=>"100x100>",:medium => "400x400>",:large=> "600x600>"},
                    :default_url => "/images/:style/missing.png",
                    :url => "/uploads/pics/:id/:id_:style.:extension",
                    :path => ":rails_root/public/uploads/pics/:id/:id_:style.:extension"
  validates_attachment_content_type :img_path, :content_type => [ 'image/gif', 'image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/jpg']
end
