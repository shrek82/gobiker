#coding: utf-8
class AttachedsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:upload]

  # GET /attacheds/new
  # GET /attacheds/new.json
  def new
    @attached = Attached.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @attached }
    end
  end

  #上传图片
  def upload
    @attached = Attached.new(params[:attached])
    if @attached.save
      #file_extension=@attached.img_file_name.split('.').last
      file_extension=@attached.img_file_name[/\.[a-z]{3,4}$/]
      file_path="/uploads/pics/"+@attached[:created_at].strftime('%Y').to_s+'/'+@attached[:created_at].strftime('%m%d').to_s+'/'+@attached[:id].to_s+"_thumb.jpg"
      respond :data => {:state=>'SUCCESS',:url=>file_path,:file_id => @attached[:id], :fileName => @attached[:img_file_name],:fileType=>@attached[:img_content_type],:fileSize => @attached[:img_file_size]}, :success => '资料修改成功'
    else
      respond :error=>@attached.errors.full_messages, :status=>500
    end
  end

end
