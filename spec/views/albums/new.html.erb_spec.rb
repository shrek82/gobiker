require 'spec_helper'

describe "albums/new" do
  before(:each) do
    assign(:album, stub_model(Album,
      :name => "MyString",
      :user_id => 1,
      :place_id => 1,
      :event_id => 1,
      :club_id => 1,
      :pics_num => 1,
      :hits_num => 1,
      :tags => "MyString",
      :cover_path => "MyString",
      :order_num => 1,
      :is_close => false,
      :is_recommended => false
    ).as_new_record)
  end

  it "renders new album form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", albums_path, "post" do
      assert_select "input#album_name[name=?]", "album[name]"
      assert_select "input#album_user_id[name=?]", "album[user_id]"
      assert_select "input#album_place_id[name=?]", "album[place_id]"
      assert_select "input#album_event_id[name=?]", "album[event_id]"
      assert_select "input#album_club_id[name=?]", "album[club_id]"
      assert_select "input#album_pics_num[name=?]", "album[pics_num]"
      assert_select "input#album_hits_num[name=?]", "album[hits_num]"
      assert_select "input#album_tags[name=?]", "album[tags]"
      assert_select "input#album_cover_path[name=?]", "album[cover_path]"
      assert_select "input#album_order_num[name=?]", "album[order_num]"
      assert_select "input#album_is_close[name=?]", "album[is_close]"
      assert_select "input#album_is_recommended[name=?]", "album[is_recommended]"
    end
  end
end
