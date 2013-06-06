require 'test_helper'

class RoutesControllerTest < ActionController::TestCase
  setup do
    @route = routes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:routes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create route" do
    assert_difference('Route.count') do
      post :create, route: { along_the_scenic: @route.along_the_scenic, banner_path: @route.banner_path, been_num: @route.been_num, category_id: @route.category_id, city_id: @route.city_id, content: @route.content, destination: @route.destination, distance: @route.distance, duration: @route.duration, favorites_num: @route.favorites_num, good_num: @route.good_num, hits_num: @route.hits_num, img_path: @route.img_path, interested_num: @route.interested_num, intro: @route.intro, is_fixed: @route.is_fixed, is_recommended: @route.is_recommended, landscape_index: @route.landscape_index, map: @route.map, province_id: @route.province_id, recommendation_index: @route.recommendation_index, road_index: @route.road_index, short_title: @route.short_title, source: @route.source, starting: @route.starting, tags: @route.tags, title: @route.title, user_id: @route.user_id }
    end

    assert_redirected_to route_path(assigns(:route))
  end

  test "should show route" do
    get :show, id: @route
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @route
    assert_response :success
  end

  test "should update route" do
    put :update, id: @route, route: { along_the_scenic: @route.along_the_scenic, banner_path: @route.banner_path, been_num: @route.been_num, category_id: @route.category_id, city_id: @route.city_id, content: @route.content, destination: @route.destination, distance: @route.distance, duration: @route.duration, favorites_num: @route.favorites_num, good_num: @route.good_num, hits_num: @route.hits_num, img_path: @route.img_path, interested_num: @route.interested_num, intro: @route.intro, is_fixed: @route.is_fixed, is_recommended: @route.is_recommended, landscape_index: @route.landscape_index, map: @route.map, province_id: @route.province_id, recommendation_index: @route.recommendation_index, road_index: @route.road_index, short_title: @route.short_title, source: @route.source, starting: @route.starting, tags: @route.tags, title: @route.title, user_id: @route.user_id }
    assert_redirected_to route_path(assigns(:route))
  end

  test "should destroy route" do
    assert_difference('Route.count', -1) do
      delete :destroy, id: @route
    end

    assert_redirected_to routes_path
  end
end
