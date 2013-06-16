require 'test_helper'

class Admin::RecommendsControllerTest < ActionController::TestCase
  setup do
    @admin_recommend = admin_recommends(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_recommends)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_recommend" do
    assert_difference('Admin::Recommend.count') do
      post :create, admin_recommend: { hits: @admin_recommend.hits, img_path: @admin_recommend.img_path, intro: @admin_recommend.intro, is_close: @admin_recommend.is_close, is_fixed: @admin_recommend.is_fixed, name: @admin_recommend.name, order_num: @admin_recommend.order_num, redirect: @admin_recommend.redirect, type: @admin_recommend.type }
    end

    assert_redirected_to admin_recommend_path(assigns(:admin_recommend))
  end

  test "should show admin_recommend" do
    get :show, id: @admin_recommend
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_recommend
    assert_response :success
  end

  test "should update admin_recommend" do
    put :update, id: @admin_recommend, admin_recommend: { hits: @admin_recommend.hits, img_path: @admin_recommend.img_path, intro: @admin_recommend.intro, is_close: @admin_recommend.is_close, is_fixed: @admin_recommend.is_fixed, name: @admin_recommend.name, order_num: @admin_recommend.order_num, redirect: @admin_recommend.redirect, type: @admin_recommend.type }
    assert_redirected_to admin_recommend_path(assigns(:admin_recommend))
  end

  test "should destroy admin_recommend" do
    assert_difference('Admin::Recommend.count', -1) do
      delete :destroy, id: @admin_recommend
    end

    assert_redirected_to admin_recommends_path
  end
end
