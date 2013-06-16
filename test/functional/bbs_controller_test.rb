require 'test_helper'

class BbsControllerTest < ActionController::TestCase
  setup do
    @bb = bbs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:forums)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create bb" do
    assert_difference('Bb.count') do
      post :create, bb: { club_id: @bb.club_id, name: @bb.name, order_num: @bb.order_num, unit_count: @bb.unit_count }
    end

    assert_redirected_to bb_path(assigns(:bb))
  end

  test "should show bb" do
    get :show, id: @bb
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @bb
    assert_response :success
  end

  test "should update bb" do
    put :update, id: @bb, bb: { club_id: @bb.club_id, name: @bb.name, order_num: @bb.order_num, unit_count: @bb.unit_count }
    assert_redirected_to bb_path(assigns(:bb))
  end

  test "should destroy bb" do
    assert_difference('Bb.count', -1) do
      delete :destroy, id: @bb
    end

    assert_redirected_to bbs_path
  end
end
