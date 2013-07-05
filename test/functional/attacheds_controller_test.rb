require 'test_helper'

class AttachedsControllerTest < ActionController::TestCase
  setup do
    @attached = attacheds(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:attacheds)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create attached" do
    assert_difference('Attached.count') do
      post :create, attached: { att: @attached.att, att_content_type: @attached.att_content_type, att_file_name: @attached.att_file_name, att_file_size: @attached.att_file_size, att_updated_at: @attached.att_updated_at, is_verify: @attached.is_verify, name: @attached.name }
    end

    assert_redirected_to attached_path(assigns(:attached))
  end

  test "should show attached" do
    get :show, id: @attached
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @attached
    assert_response :success
  end

  test "should update attached" do
    put :update, id: @attached, attached: { att: @attached.att, att_content_type: @attached.att_content_type, att_file_name: @attached.att_file_name, att_file_size: @attached.att_file_size, att_updated_at: @attached.att_updated_at, is_verify: @attached.is_verify, name: @attached.name }
    assert_redirected_to attached_path(assigns(:attached))
  end

  test "should destroy attached" do
    assert_difference('Attached.count', -1) do
      delete :destroy, id: @attached
    end

    assert_redirected_to attacheds_path
  end
end
