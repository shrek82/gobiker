#coding: utf-8
class Forum < ActiveRecord::Base
  attr_accessible :club_id, :name, :order_num, :unit_count

  def to_s
    name
  end

end
