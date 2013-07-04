#encoding:utf-8
module CommonHelper

  #是否为ajax请求
  def is_ajax?
    request.xhr?
  end

  #结束输出到客户端
  def render_client(data={})

    #获取客户端请求格式
    format=params[:_format]||'html'

    #服务器返回参数
    data[:data]||={}
    data[:status]||=200
    data[:layout]=true
    data[:layout]=false if is_ajax?
    data[:data].store("redirect_to", data[:redirect_to]) if data[:redirect_to]
    data[:data].store("notice", data[:notice]) if data[:notice]

    #返回成功或错误标示及详细信息
    if data[:success]
      data[:data].store("status", 1)
      data[:data].store("success", data[:success])
    elsif data[:error]
      data[:data].store("status", 0)
      data[:data].store("error", data[:error])
    end

    #根据不同格式需求方式呈现不同结果

    #普通方式请求且指定运行结束后跳转，优先进行跳转
    #ajax请求时，不执行跳转，否则ajax获取结果会是跳转后的页面
    if data[:redirect_to] && !is_ajax?
      redirect_to data[:redirect_to], :notice => data[:notice], :success => data[:success]
      #仅当指定action才渲染模板(并根据是否为ajax觉得是否使用layout),一般是提交页面没有模板
    elsif format=='html'
      if data[:action]
        render action: data[:action], layout: data[:layout], status: data[:status]
      elsif data[:template]
        render template: data[:template]
      else
        render :text => '<div class="alert alert-block">未指定action或template名称!</div>'
      end
      #输出json格式结果
    elsif format=='json'
      render :json => data[:data].to_json
      #输出xml格式代码
    elsif format=='xml'
      render :xml => data[:data].to_xml
      #输出纯文本格式格式
    elsif format=='text'
      render :text => data[:text]
      #不输出任何内容
    else
      render nothing: true, status: data[:status]
    end
  end
end
