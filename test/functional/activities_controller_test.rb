require 'test_helper'

class ActivitiesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get edit" do
    get :edit
    assert_response :success
  end

  test "should get update" do
    get :update
    assert_response :success
  end

  test "should get sign_up" do
    get :sign_up
    assert_response :success
  end

  test "should get sign_out" do
    get :sign_out
    assert_response :success
  end

  test "should get tags" do
    get :tags
    assert_response :success
  end

end
