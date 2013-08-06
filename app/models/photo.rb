#coding: utf-8
class Photo < ActiveRecord::Base
  attr_accessible :title,:album_id,:user_id,:img_path, :is_verify,
                  :img, :img_content_type, :img_file_name, :img_file_size, :img_updated_at

  has_attached_file :img,
                    :styles => {:square=>"80x80#",:mini => "100x100>",:thumb => "150x150>",:medium => "300x300>", :large => "600x600>",:original => "800x800>"},
                    :default_url => "/images/:style/missing.png",
                    :url => "/uploads/pics/:year/:month:day/:id_:style.:extension",
                    :path => ":rails_root/public/uploads/pics/:year/:month:day/:id_:style.:extension"
  validates_attachment_content_type :img, :content_type => ['image/gif', 'image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/jpg','application/octet-stream']
  belongs_to :album
  belongs_to :user

  after_create :set_img_path
  after_save :expire_cache_by_name
  after_save :expire_cache_by_id

  #私有方法
  private

  #添加后修改图片路径
  def set_img_path
    file_extension=self.img_file_name[/\.[a-z]{3,4}$/]
    img_path='/uploads/pics/'+self.img_updated_at.strftime('%Y')+'/'+self.img_updated_at.strftime('%m%d')+'/'+self.id.to_s+'_thumb'+file_extension
    update_attr={:img_path=>img_path}
    update_attr.store('title',self.img_file_name.sub(/\.[a-z]{3,4}$/,'')) if self.title.nil?
    self.update_attributes(update_attr)
  end

  def expire_cache_by_name
    #Rails.cache.expire("my_object:name:#{self.name}")
  end

  def expire_cache_by_id
    #Rails.cache.expire("my_object:#{self.id}")
  end

end
