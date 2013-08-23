require 'spec_helper'

describe InstallController do

  describe "GET 'setting'" do
    it "returns http success" do
      get 'setting'
      response.should be_success
    end
  end

  describe "GET 'user'" do
    it "returns http success" do
      get 'user'
      response.should be_success
    end
  end

  describe "GET 'forum'" do
    it "returns http success" do
      get 'forum'
      response.should be_success
    end
  end

  describe "GET 'manager'" do
    it "returns http success" do
      get 'manager'
      response.should be_success
    end
  end

end
