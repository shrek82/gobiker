class UController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user}
    end
  end

  #个人相册
  def albums

  end

  #个人相册详情
  def album

  end

  #上传照片
  def albums_upload

  end
end