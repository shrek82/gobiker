#coding: utf-8
class Recommend < ActiveRecord::Base
  attr_accessible :hits, :img_path,:img_ids, :intro, :is_close, :is_fixed, :name, :order_num, :redirect, :type
  validates_presence_of :name
  validates_presence_of :redirect
  validates_presence_of :type

  #所有分类
  def self.all_type
    return{:place=>'目的地',:route=>'路线'}
  end

  def to_s
    name
  end

end
