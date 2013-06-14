#coding: utf-8
class City < ActiveRecord::Base
  attr_accessible :name, :order_num, :province_id

  def to_s
    name
  end

end
