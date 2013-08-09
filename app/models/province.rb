#coding: utf-8
class Province < ActiveRecord::Base
  attr_accessible :name,:pinyin,:group
  has_many :places
  has_many :routes
  has_many :cities

  def to_s
    name
  end

end
