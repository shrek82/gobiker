#coding: utf-8
class PlacesController < ApplicationController
  # GET /places

  #页面缓冲
  #caches_page :index,:show

  def index
    @places = Place.paginate(:page => params[:page], :per_page => 8,:order=>"places.id DESC")

    #删除所有缓存，引用表明是使用复数形式很重要
    #Rails.cache.clear
    @recommended=Place.get_recommended(6, :order => 'id DESC', :where => ['id>? AND is_recommended=?', 10, true])
    #=>SELECT "places".* FROM "places" LIMIT 8 OFFSET 0

    #=>SELECT "places".* FROM "places" INNER JOIN "users" ON "users"."id" = "places"."user_id" WHERE "places"."is_recommended" = 't' LIMIT 3
    @recommended=Place.select("places.*").joins(:user).recommended.limit(3)
    
    #=>SELECT user.username FROM "places" LEFT JOIN user ON user.id=place.user_id LIMIT 4
    @test=Place.select("places.id,places.name").join_user.limit(4)
    
    #=>SELECT "places".* FROM "places" WHERE "places"."is_fixed" = 't'
    @fixed=Place.where(:is_fixed=>true)

    @address=Place.select("places.id,places.address").recommended.join_city.limit(6)

    #枚举查询测试
    @search=Place.base_field.search('华家池','茅').join_user.join_city.limit(2)
    #=>SELECT places.id,places.name, users.username, provinces.name,cities.name FROM "places" LEFT JOIN users ON users.id=places.user_id LEFT JOIN provinces ON provinces.id=places.province_id LEFT JOIN cities ON cities.id=places.city_id WHERE (places.name like '%华家池%' OR places.name like '%茅%') LIMIT 2
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @places }
    end
  end

  # GET /places/1
  # GET /places/1.json
  def show
    #@place = Rails.cache.fetch "place#{params[:id]}" do
    @place=Place.find(params[:id])
    #end
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @place }
      format.xml { render xml: @place }
    end
    #fresh_when(:etag => [@place,@placeddd])
  end

  # GET /places/new
  # GET /places/new.json
  def new
    @place = Place.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @place }
    end
  end

  # GET /places/1/edit
  def edit
    @place = Place.find(params[:id])
  end

  # POST /places
  # POST /places.json
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

  # PUT /places/1
  # PUT /places/1.json
  def update
    @place = Place.find(params[:id])

    respond_to do |format|
      if @place.update_attributes(params[:place])
        format.html { redirect_to @place, notice: 'Place was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @place.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /places/1
  # DELETE /places/1.json
  def destroy
    @place = Place.find(params[:id])
    @place.destroy

    respond_to do |format|
      format.html { redirect_to places_url }
      format.json { head :no_content }
    end

    Mail.new({:to => 'mikel@test.lindsaar.net',
    'from' => 'bob@test.lindsaar.net',
    :subject => 'This is an email',
    :body => 'This is the body' })

  end
end

#test
