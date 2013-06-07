#coding: utf-8

class UserMailer < ActionMailer::Base

  default from: "hmilyo2008@163.com"

  def welcome_email(user)
    @user = user
    mail(:to => user[:email], :subject => "欢迎加入骑趣网，开始一段美好的旅行吧！")
  end

  def activation_mail(email)
    mail(:to => email, :subject => "骑趣网——注册激活邮件")
  end
end
