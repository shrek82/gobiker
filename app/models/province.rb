#coding: utf-8
class Province < ActiveRecord::Base
  attr_accessible :name
  has_many :places
  has_many :routes

  def to_s
    name
  end

end
