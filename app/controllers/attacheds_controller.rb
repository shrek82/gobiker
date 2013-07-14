#coding: utf-8
class AttachedsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:upload]

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

    if @attached.save
      render :text => '{"url":"/uploads/pics/2013/0708/123_thumb.jpg","title":"sdfsdf","original":"123_thumb.jpg","state":"SUCCESS"}'
      #file_path="/uploads/pics/"+@attached[:create_at].strftime('%Y').to_s+'/'+@attached[:create_at].strftime('%m%n').to_s+'/'+@attached[:id].to_s+"_thumb.jpg"
      #render_client :data => {:state=>'SUCCESS',:url=>file_path,:file_id => @attached[:id], :fileName => @attached[:img_file_name],:fileType=>'jpg',:fileSize => @attached[:img_file_size]}, :success => '资料修改成功'
    else
      render json: @attached.errors, status: :unprocessable_entity
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


  def upload
    @attached = Attached.new(params[:attached])
    if @attached.save
      file_path="/uploads/pics/"+@attached[:created_at].strftime('%Y').to_s+'/'+@attached[:created_at].strftime('%m%d').to_s+'/'+@attached[:id].to_s+"_thumb.jpg"
      render_client :data => {:state=>'SUCCESS',:url=>file_path,:file_id => @attached[:id], :fileName => @attached[:img_file_name],:fileType=>@attached[:img_content_type],:fileSize => @attached[:img_file_size]}, :success => '资料修改成功'
    else
      render json: @attached.errors, status: :unprocessable_entity
    end
  end

end
