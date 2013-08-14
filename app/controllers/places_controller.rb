#coding: utf-8
class PlacesController < ApplicationController

  def index

    @recommended=Rails.cache.fetch('place_home_recommended', :expires_in => 30.minutes) do
      Place.get_recommended(6)
    end

    @places = Place.paginate(:page => params[:page], :per_page => 12, :order => "places.id DESC")

    respond_to do |format|
      format.html
      format.json { render json: @places }
    end
  end

  #按城市查看
  def city
    @name=params[:name]
    @city=not_found do
      City.find_by_pinyin(@name)
    end
  end

  #显示目的地
  def show
    @place=Place.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @place }
      format.xml { render xml: @place }
    end
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
              :body => 'This is the body'})

  end

  #相册
  def photos
    @place=Place.find(params[:id])
    @album=Album.find_or_create_by_place_id(params[:id],:place_id=>@place.id,:name=>@place.name+'相册')
    @photos=Photo.paginate(:page => params[:page], :per_page => 12, :order => "photos.id DESC")
  end
end

#test
