require 'spec_helper'

describe "albums/show" do
  before(:each) do
    @album = assign(:album, stub_model(Album,
      :name => "Name",
      :user_id => 1,
      :place_id => 2,
      :event_id => 3,
      :club_id => 4,
      :pics_num => 5,
      :hits_num => 6,
      :tags => "Tags",
      :cover_path => "Cover Path",
      :order_num => 7,
      :is_close => false,
      :is_recommended => false
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/3/)
    rendered.should match(/4/)
    rendered.should match(/5/)
    rendered.should match(/6/)
    rendered.should match(/Tags/)
    rendered.should match(/Cover Path/)
    rendered.should match(/7/)
    rendered.should match(/false/)
    rendered.should match(/false/)
  end
end
