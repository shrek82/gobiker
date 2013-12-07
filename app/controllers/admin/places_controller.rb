#coding: utf-8
class Admin::PlacesController < AdminController

  #目的地列表
  def index
    conditions=Array.new
    if params[:q]
      conditions << "name LIKE ?"
      conditions << "%#{params[:q]}%"
    end
    @places=Place.paginate(:page => params[:page], :per_page => 10, :conditions => conditions, :include => :user)
  end

  #添加记录
  def new
    @place = Place.new
    @place[:user_id]=1
  end

  #编辑记录
  def edit
    @place = Place.find(params[:id])
    @album=Album.find_or_create_by_place_id(@place.id, :place_id => @place.id,:name=>@place.name+'相册',:order_num=>1)
    @pics=Photo.where(:album_id => @album.id)
  end

  #提交新建

  def create

    @place = Place.new(params[:place])
    @place.is_fixed=params[:is_fixed]
    @place.is_recommended=params[:is_recommended]
    if @place.save
      respond :redirect_to => admin_places_path, :success => '目的地添加成功'
    else
      respond :action => 'new',:error => @place.errors.full_messages
    end
  end

  #显示
  def show
  end

  #保存修改
  def update

    @place = Place.find(params[:id])
    @place.is_fixed=params[:is_fixed]
    @place.is_recommended=params[:is_recommended]
    if @place.update_attributes(params[:place])
      respond :redirect_to => admin_places_path, :success => '资料修改成功'
    else
      respond :action => 'edit', :error => @place.errors.full_messages
    end
  end

  #删除
  def destroy
    @place = Place.find(params[:id])
    @place.destroy
    respond :redirect_to => admin_places_path, :success => '资料删除成功'
  end

end


