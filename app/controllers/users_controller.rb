#coding: utf-8
#1. 多个部分统一运行：
#rake test
#rake test:units
#rake test:funtionals

#2. 单独测试某个文件
#rake test:units TEST=test/unit/some_test.rb

class UsersController < ApplicationController
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    request.xhr?

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.present?
        format.html
        format.json { render :json => @user }
      else
        format.any { head status: :not_found }
      end
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show2
    @user = User.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(params[:user])
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  #登陆
  def login
    if request.post?
      @user=User.find_by_email(params[:email])
      respond_to do |format|
        if @user&&@user.password==params[:password]
          cookies[:uid]=@user.id
          cookies[:email]=@user.email
          cookies[:username]=@user.username
          @user.login_date=Time.now
          @user.save
          flash[:success]='恭喜您登陆成功，即将跳转至首页'
          format.html
          format.json { render :json => @user }
        elsif @user
          flash[:error]='很抱歉，密码错误，请重试！'
          format.html
          format.json { render :json => {:error => '很抱歉，密码错误，请重试！'} }
        else
          flash[:error]='邮箱或密码不能为空'
          format.html
          format.json { render :json => {:error => '邮箱或密码不能为空'} }
        end
      end
    end
  end

  #注册验证
  def ajax
    @email=params[:email]
    @act=params[:act]

    #验证是否可用
    if @act=='checkemail'
      user=User.find_by_email(@email)
      if user
        render json: {error: 1, msg: "该帐号已经被注册了!"}
      else
        render json: {error: 0}
      end
    end

    #发送激活邮件
    if @email&&(@act=='sendmail'||@act=='resentcode')
      UserMailer.activation_mail(@email).deliver
      render :template => 'users/_reg_active_mail', :layout => false
    end

  end

end
