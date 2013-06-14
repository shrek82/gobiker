
#coding: utf-8
class Province < ActiveRecord::Base


attr_accessible :name


  def to_s

    name

end

end
