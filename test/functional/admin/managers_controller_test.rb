require 'test_helper'

class Admin::ManagersControllerTest < ActionController::TestCase
  setup do
    @admin_manager = admin_managers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:admin_managers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create admin_manager" do
    assert_difference('Admin::Manager.count') do
      post :create, admin_manager: { email: @admin_manager.email, login_at: @admin_manager.login_at, name: @admin_manager.name, password: @admin_manager.password, role: @admin_manager.role }
    end

    assert_redirected_to admin_manager_path(assigns(:admin_manager))
  end

  test "should show admin_manager" do
    get :show, id: @admin_manager
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @admin_manager
    assert_response :success
  end

  test "should update admin_manager" do
    put :update, id: @admin_manager, admin_manager: { email: @admin_manager.email, login_at: @admin_manager.login_at, name: @admin_manager.name, password: @admin_manager.password, role: @admin_manager.role }
    assert_redirected_to admin_manager_path(assigns(:admin_manager))
  end

  test "should destroy admin_manager" do
    assert_difference('Admin::Manager.count', -1) do
      delete :destroy, id: @admin_manager
    end

    assert_redirected_to admin_managers_path
  end
end
