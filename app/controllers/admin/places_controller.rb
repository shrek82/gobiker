#coding: utf-8
class Admin::PlacesController < AdminController
  
  def index
    #@conditions=['id>10']
    #@places = Place.paginate(:page => params[:page], :per_page => 10)
    #keyword='植物园'
    #@places = Place.paginate(
    #    :page => params[:page],
    #    :per_page => 10,
    #    :conditions => ["city_id = ? and name LIKE ?", 1, "%#{keyword}%"]
    #)
    conditions=Array.new
    if params[:q]
      conditions << "name LIKE ?"
      conditions << "%#{params[:q]}%"
    end
    @places=Place.paginate(:page => params[:page], :per_page => 10,:conditions=>conditions,:include=>:user)
    @places.each do |p|
      p.user.username
    end
  end

  #添加
  def new
    @place = Place.new
  end

  #编辑

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
    respond_to do |format|
      if @place.update_attributes(params[:place])
        format.html { redirect_to admin_places_path, notice: 'Place was successfully updated.' }
        #format.html { redirect_to @place, notice: 'Place was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
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

  def float(arg)
    super
  end

  #Renders
  def search
    @results = Search.find(params[:query])
    case @results.count
      when 0 then
        render :action => "no_results"
      when 1 then
        render :action => "show"
      when 2..10 then
        render :action => "show_many"
    end
  end

  #Redirects
  def create
    @entry = Entry.new(params[:entry])
    if @entry.save
      # The entry was saved correctly, redirect to show
      redirect_to :action => 'show', :id => @entry.id
    else
      # things didn't go so well, do something else
    end
  end


end


