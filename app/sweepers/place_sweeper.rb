#coding:utf-8
class PlaceSweeper < ActionController::Caching::Sweeper

  # 跟随缓存变换的model
  observe Place

  # If our sweeper detects that a Product was created call this
  def after_create(place)
    expire_cache_for(place)
  end

  # If our sweeper detects that a Product was updated call this
  def after_update(place)
    expire_cache_for(place)
  end

  # If our sweeper detects that a Product was deleted call this
  def after_destroy(place)
    expire_cache_for(place)
  end

  private
  def expire_cache_for(place)
    # Expire the index page now that we added a new place
    expire_page(:controller => 'places', :action => 'index')

    # Expire a fragment
    expire_fragment('all_available_places')
  end
end