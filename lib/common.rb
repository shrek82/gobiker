#coding: utf-8

class Common
  #生成激活码
  def activecode(email)
    if email
      Digest::SHA1.hexdigest(email.to_s+'gobiker.cn')
    end
  end
end