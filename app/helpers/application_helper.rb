#coding: utf-8
module ApplicationHelper
  def render_stars(value)
    output = ''
    if (1..5).include?(value)
      value.times { output += '*' }
    end
    output
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

  #表单验证提示
  def validate_msg(record)
    if record.errors.any?
      str='<div class="alert alert-block"> <button type="button" class="close" data-dismiss="alert">×</button> <h4>错误的操作('+@place.errors.count.to_s+'处)</h4> <ul>'
      record.errors.full_messages.each do |msg|
        str+='<li>'+msg+'</li>'
      end
      str+='<ul></div>'
    end
    raw(str)

  end
end
