#coding: utf-8
class City < ActiveRecord::Base
  attr_accessible :name, :order_num, :province_id
  has_many :places

  def to_s
    name
  end

end
