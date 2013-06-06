require 'spec_helper'

describe "Static pages" do

  describe "Contact page" do

    it "should have the h1 'Contact'" do
      visit '/login'
      page.should have_selector('h1', text: 'Contact')
    end

    it "should have the title 'Contact'" do
      visit '/register'
      page.should have_selector('title', text: "Ruby on Rails Tutorial Sample App | Contact")
    end
  end
end