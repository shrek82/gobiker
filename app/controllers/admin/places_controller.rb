#coding: utf-8
class Admin::PlacesController < AdminController
  def index
    @conditions=['id>10']
    @places = Place.where(:id => 1..20).paginate(:page => params[:page], :per_page => 10)
    keyword='植物园'
    @places = Place.paginate(
        :page => params[:page],
        :per_page => 10,
        :conditions => ["city_id = ? and name LIKE ?", 1, "%#{keyword}%"]
    )

  end

  def new

  end

  def edit
  end

  def show
  end

  def upload
  end
end
