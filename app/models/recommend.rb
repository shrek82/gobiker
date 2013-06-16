#coding: utf-8
class Recommend < ActiveRecord::Base
  attr_accessible :hits, :img_path, :intro, :is_close, :is_fixed, :name, :order_num, :redirect, :type

  def to_s
    name
  end

end
