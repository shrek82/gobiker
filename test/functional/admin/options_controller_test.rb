require 'test_helper'

class Admin::OptionsControllerTest < ActionController::TestCase
  setup do
    @admin_option = admin_options(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_options)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_option" do
    assert_difference('Admin::Option.count') do
      post :create, admin_option: { key_name: @admin_option.key_name, name: @admin_option.name, value: @admin_option.value }
    end

    assert_redirected_to admin_option_path(assigns(:admin_option))
  end

  test "should show admin_option" do
    get :show, id: @admin_option
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_option
    assert_response :success
  end

  test "should update admin_option" do
    put :update, id: @admin_option, admin_option: { key_name: @admin_option.key_name, name: @admin_option.name, value: @admin_option.value }
    assert_redirected_to admin_option_path(assigns(:admin_option))
  end

  test "should destroy admin_option" do
    assert_difference('Admin::Option.count', -1) do
      delete :destroy, id: @admin_option
    end

    assert_redirected_to admin_options_path
  end
end
