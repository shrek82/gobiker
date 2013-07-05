class AttachedsController < ApplicationController
  # GET /attacheds
  # GET /attacheds.json
  def index
    @attacheds = Attached.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @attacheds }
    end
  end

  # GET /attacheds/1
  # GET /attacheds/1.json
  def show
    @attached = Attached.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @attached }
    end
  end

  # GET /attacheds/new
  # GET /attacheds/new.json
  def new
    @attached = Attached.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @attached }
    end
  end

  # GET /attacheds/1/edit
  def edit
    @attached = Attached.find(params[:id])
  end

  # POST /attacheds
  # POST /attacheds.json
  def create
    @attached = Attached.new(params[:attached])

    respond_to do |format|
      if @attached.save
        format.html { redirect_to @attached, notice: 'Attached was successfully created.' }
        format.json { render json: @attached, status: :created, location: @attached }
      else
        format.html { render action: "new" }
        format.json { render json: @attached.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /attacheds/1
  # PUT /attacheds/1.json
  def update
    @attached = Attached.find(params[:id])

    respond_to do |format|
      if @attached.update_attributes(params[:attached])
        format.html { redirect_to @attached, notice: 'Attached was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @attached.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /attacheds/1
  # DELETE /attacheds/1.json
  def destroy
    @attached = Attached.find(params[:id])
    @attached.destroy

    respond_to do |format|
      format.html { redirect_to attacheds_url }
      format.json { head :no_content }
    end
  end
end
