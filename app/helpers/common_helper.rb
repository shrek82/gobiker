#encoding:utf-8
module CommonHelper

  #查找记录,不存在返回错误页面
  def find_record(&block)
  end

#是否为ajax请求
  def is_ajax?
    request.xhr?
  end

#结束输出到客户端
  def respond(options={})

    default={
        :data => {:status => 1},
        :_format => 'html',
        :status => 200,
        :layout => true
    }

    data=default.merge options

    #服务器返回参数
    data[:layout]=false if is_ajax?

    #返回方法
    data[:data].store("redirect_to", data[:redirect_to]) if data[:redirect_to]
    data[:data].store("notice", data[:notice]) if data[:notice]

    format=data[:_format]
    #返回成功或错误标示及详细信息
    #有在非ajax请求的时候，才显示flash信息
    if data[:success]
      flash[:success]=data[:success] unless is_ajax?
      data[:data].store("success", data[:success])
    elsif data[:error]
      flash[:error]=data[:error] unless is_ajax?
      data[:data].status=0
      data[:data].store("error", data[:error])
    end

    #根据不同格式需求方式呈现不同结果

    #普通方式请求且指定运行结束后跳转，优先进行跳转
    #ajax请求时，不执行跳转，否则ajax获取结果会是跳转后的页面
    if data[:redirect_to] && !is_ajax?
      redirect_to data[:redirect_to], :notice => data[:notice]

      #仅当指定action才渲染模板(并根据是否为ajax觉得是否使用layout),一般是提交页面没有模板
    elsif format=='html'
      if defined? data[:action]
        render action: data[:action], layout: data[:layout], status: data[:status]
      elsif defined? data[:template]
        render template: data[:template]
      else
        render :text => '<div class="alert alert-block">html格式需指定action或template名称!</div>'
      end
      #输出json格式结果
    elsif format=='json'
      render :json => data[:data].to_json, status: data[:status]
      #输出xml格式代码
    elsif format=='xml'
      render :xml => data[:data].to_xml, status: data[:status]
      #输出纯文本格式格式
    elsif format=='text'
      render :text => data[:text], status: data[:status]
      #不输出任何内容
    else
      render nothing: true, status: data[:status], status: data[:status]
    end
  end

  def auto_link(mystr)
    require 'uri'
    x = URI.extract(mystr, ['http', 'https', 'ftp'])
    x.each do |e|
      #Because parenthesis will be treated as url ,but no one use it.So it gsub all ().If I do not do it, this method will exception:unmatched close parenthesis
      m = mystr.match(/( [^ \n]*)#{e.gsub(/[()]/, '')}/)
      e_pic = e.match(/.*.(png|jpg|jpeg|gif)/i)
      unless e_pic
        if !m.nil? and m[1].to_s.strip != ""
          g = "<a href='#{e}' target='_blank'>#{m[1]}</a>"
          mystr = mystr.sub(m[0], g)
        else
          g = " <a href='#{e}' target='_blank'>#{e}</a>"
          mystr = mystr.sub(e, g)
        end
      end
    end
    mystr
  end

  def auto_img(mystr)
    require 'uri'
    x = URI.extract(mystr, ['http'])
    x.each do |e|
      m = e.match(/.*.(png|jpg|jpeg|gif)/i)
      if m
        g = "<div style='text-align:center'><img src='#{m}'/></div>"
        mystr = mystr.sub(m[0], g)
      end
    end
    mystr
  end

  def auto_emotion(mystr)
    emotions = emotions_hash
    reg_str = ""
    emotions.each_with_index do |(id), i|
      reg_str += t("emotions.t#{id}")
      reg_str += "|" if i < emotions.size - 1
    end
    m = mystr.scan(/\/(#{reg_str})/m)
    m.uniq.each do |e|
      mystr = mystr.gsub("/#{e[0]}", "<img src=\"http://mystory.b0.upaiyun.com/images/emotions/#{emotions.invert[e[0]]}.gif\" alt=\"/#{e[0]}\" title=\"/#{e[0]}\">")
    end
    mystr
  end

  def ignore_emotions(mystr)
    emotions = emotions_hash
    reg_str = ""
    emotions.each_with_index do |(id), i|
      reg_str += t("emotions.t#{id}")
      reg_str += "|" if i < emotions.size - 1
    end
    m = mystr.scan(/\/(#{reg_str})/m)
    m.uniq.each do |e|
      mystr = mystr.gsub("/#{e[0]}", "(#{e[0]})")
    end
    mystr
  end

  def photos_count(mystr)
    m = mystr.scan(/(\+photo(\d{2,})\+)/m)
    m.size
  end

end
