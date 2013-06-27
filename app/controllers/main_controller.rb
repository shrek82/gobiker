class MainController < ApplicationController

  caches_page :index,:test

  def index
    @string = 'hjhjhj'
  end

  def test
    @sdfs='sdfsf'
  end
end