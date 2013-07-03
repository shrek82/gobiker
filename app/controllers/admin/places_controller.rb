#coding: utf-8
class Admin::PlacesController < AdminController

  cache_sweeper :place_sweeper, :only => [:create, :update, :destroy]

  #目的地列表
  def index
    conditions=Array.new
    if params[:q]
      conditions << "name LIKE ?"
      conditions << "%#{params[:q]}%"
    end
    @places=Place.paginate(:page => params[:page], :per_page => 10, :conditions => conditions, :include => :user)
    @places.each do |p|
      p.user.username
    end
  end

  #添加记录
  def new
    @place = Place.new
  end

  #编辑记录
  def edit
    @place = Place.find(params[:id])
  end

  #提交新建
  def create
    @place = Place.new(params[:place])

    respond_to do |format|
      if @place.save
        format.html { redirect_to @place, notice: 'Place was successfully created.' }
        format.json { render json: @place, status: :created, location: @place }
      else
        format.html { render action: "new" }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
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
      render_success :redirect_to=>admin_places_path,:success=>'资料修改成功!',:notice=>'资料没有发生变化'
    else
      render_error :action=>'edit',:error=>@place.errors.full_messages
    end
  end

  #删除
  def destroy
    @place = Place.find(params[:id])
    @place.destro

    respond_to do |format|
      format.html { redirect_to places_url }
      format.json { head :no_content }
    end
  end

end


