class Admin::PlacesController < AdminController
  def index
    @places = Place.paginate(:page => params[:page], :per_page =>15)
  end

  def edit
  end

  def show
  end

  def upload
  end
end
