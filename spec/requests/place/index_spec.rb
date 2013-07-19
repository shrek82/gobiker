# encoding: utf-8

require 'spec_helper'

feature '访问目的地首页' do

  background do
    @published_places = FactoryGirl.create_list :place, 3
    visit places_path
    page.should have_content("elephants")
  end


end