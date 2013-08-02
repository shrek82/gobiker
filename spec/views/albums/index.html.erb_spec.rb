require 'spec_helper'

describe "albums/index" do
  before(:each) do
    assign(:albums, [
      stub_model(Album,
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
      ),
      stub_model(Album,
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
      )
    ])
  end

  it "renders a list of albums" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
    assert_select "tr>td", :text => 6.to_s, :count => 2
    assert_select "tr>td", :text => "Tags".to_s, :count => 2
    assert_select "tr>td", :text => "Cover Path".to_s, :count => 2
    assert_select "tr>td", :text => 7.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
