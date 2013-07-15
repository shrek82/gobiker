#coding: utf-8
module ApplicationHelper
  def render_stars(value)
    output = ''
    if (1..5).include?(value)
      value.times { output += '*' }
    end
    output
  end

  def to_pretty(time)
    a = Time.now.to_i-time.to_i
    case a
      when 0 then '刚刚'
      when 1 then '1秒前'
      when 2..59 then a.to_s+' 秒前'
      when 60..119 then '1分钟前' #120 = 2 minutes
      when 120..3540 then (a/60).to_i.to_s+'分钟前'
      when 3541..7100 then '1小时前' # 3600 = 1 hour
      when 7101..82800 then ((a+99)/3600).to_i.to_s+'小时前'
      when 82801..172000 then '1天前' # 86400 = 1 day
      when 172001..518400 then ((a+800)/(60*60*24)).to_i.to_s+'天前'
      when 518400..1036800 then '1星期前'
      else ((a+180000)/(60*60*24*7)).to_i.to_s+'星期前'
    end
  end

  #:class - CSS class name for the generated DIV (default: "pagination")
  #:previous_label - default: "« Previous"
  #:next_label - default: "Next »"
  #:page_links - when false, only previous/next links are rendered (default: true)
  #:inner_window - how many links are shown around the current page (default: 4)
  #:outer_window - how many links are around the first and the last page (default: 1)
  #:link_separator - string separator for page HTML elements (default: single space)
  #:param_name - parameter name for page number in URLs (default: :page)
  #:params - additional parameters when generating pagination links (eg. :controller => "foo", :action => nil)
  #:renderer - class name, class or instance of a link renderer (default in Rails: WillPaginate::ActionView::LinkRenderer)
  #:container - toggles rendering of the DIV container for pagination links, set to false only when you are rendering your own pagination markup (default: true)
  #All options not recognized by will_paginate will become HTML attributes on the container element for pagination links (the DIV). For example:

  def go_pager(record)
    will_paginate record, :page_links => true, :class => 'ui_page', :previous_label => '上一页', :next_label => '下一页'
  end

  #信息提示
  def block_alert
    if flash[:notice]
      return raw '<div class="alert alert-block"> <button type="button" class="close" data-dismiss="alert">×</button>'+flash[:notice].to_s+'</div>'
    elsif flash[:error]
      return raw '<div class="alert alert-error"> <button type="button" class="close" data-dismiss="alert">×</button> <strong>操作错误!</strong>'+flash[:error].to_s+'</div>'
    elsif flash[:success]
      return raw '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">×</button> <strong>操作成功!</strong>'+flash[:success].to_s+'</div>'
    end
  end

  #表单验证提示
  def validate_msg(record)
    if record.errors.any?
      str='<div class="alert alert-block"> <button type="button" class="close" data-dismiss="alert">×</button> <h4>错误的操作('+record.errors.count.to_s+'处)</h4> <ul>'
      record.errors.full_messages.each do |msg|
        str+='<li>'+msg+'</li>'
      end
      str+='<ul></div>'
    end
    raw(str)
  end

  #自动显示省市区下拉菜单并选择
  def province_city_area_select(object, pid=nil, cid=nil, aid=nil)
    provinces=Province.all
    html='<select name="'+object.to_s+'[province_id]" id="provinces" onchange="get_cities(this.value)" class="span2">'
    html+='<option>选择省份</option>'
    provinces.each do |p|
      selected=''
      selected='selected' if p.id==pid
      html+='<option value="'+p.id.to_s+'"'+selected+'>'+p.name+'</option>'
    end

    html+='</select>'

    #显示市
    html+='&nbsp;<span id="city_select">'
    if pid
      cities=City.where(:province_id => pid)
      html+='<select name="'+object.to_s+'[city_id]" id="cities" onchange="get_areas(this.value)" class="span2">'
      html+='<option>选择县市</option>'
      cities.each do |c|
        selected=''
        selected='selected' if cid&&c.id==cid
        html+='<option value="'+c.id.to_s+'"'+selected+'>'+c.name+'</option>'
      end
      html+='</select>'
    end
    html+='</span>'

    #区
    html+='&nbsp;<span id="area_select">'
    if cid
      areas=Area.where(:city_id => cid)
      html+='<select name="'+object.to_s+'[area_id]" id="areas" class="span2">'
      html+='<option>选择区</option>'
      areas.each do |a|
        selected=''
        selected='selected' if aid&&a.id==aid
        html+='<option value="'+a.id.to_s+'"'+selected+'>'+a.name+'</option>'
      end
      html+='</select>'
    end
    html+='</span>'

    raw(html)
  end


  #显示省份下拉菜单
  def province_select(selected_id=0)
    provinces=Province.all
    html='<select name="province_id" id="provinces" onchange="get_cities(this.value)" class="span2">'
    html+='<option>选择省份</option>'
    provinces.each do |p|
      selected=''
      selected='selected' if p.id==selected_id
      html+='<option value="'+p.id.to_s+'"'+selected+'>'+p.name+'</option>'
    end
    raw(html+='</select>')
  end


  #显示附件照片
  def img_path(p={},size='thumb')
    return '/uploads/pics/'+p[:created_at].strftime('%Y')+'/'+p[:created_at].strftime('%m%d')+'/'+p[:id].to_s+'_'+size+'.jpg'
  end
end
