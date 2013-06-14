require 'test_helper'

class PlaceTest < ActiveSupport::TestCase
  test 'ceshi fang fa' do
    place=new Place.new
    assert place.invalid?
    assert place.errors[:name].any?
    assert place.save
  end

  test 'true' do
    true
  end
end
