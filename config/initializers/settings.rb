#coding: utf-8

#自定义配置
#使用 Gobiker::Application.config.site_keyword
Gobiker::Application.configure do

#Setting缓存初始化
  Setting[:site_name] = '骑趣网' # 站点名称，如: Rabel
  Setting[:welcome_tip] = '欢迎访问<strong>Rabel</strong>' # 网站欢迎语, 支持html标签
  Setting[:splash] = '<div class="hero-unit"><h1>Rabel</h1><p>新一代简洁社区软件</p></div>'
  Setting[:ga_id] = '' # Google Analytics ID
  Setting[:default_search_engine] = 'google' # 默认搜索引擎，可从下面的搜索引擎列表中选择
  Setting[:seo_description] = 'Rabel - 新一代简洁社区软件' # SEO 描述
  Setting[:short_intro] = '新一代简洁社区软件' # 网站简短介绍, 显示在右侧边栏
  Setting[:footer] = '<p>&copy; 2012 Rabel</p>'
  Setting[:mobile_footer] = '&copy; 2012 Rabel'
  Setting[:custom_css] = '' # 全局自定义CSS
  Setting[:custom_js] = '' # 全局自定义JavaScript
  Setting[:custom_head_tags] = '' # 自定义Head标签
  Setting[:marketing] = ['Rails', 'PostgreSQL', 'BDD'] # 市场宣传关键字
  Setting[:pagination_topics] = "25"
  Setting[:pagination_comments] = "100"
  Setting[:nav_position] = 'bottom'
  Setting[:show_captcha] = 'off'
  Setting[:custom_logo] = ''
  Setting[:global_banner] = ''
  Setting[:theme] = 'rabel'
  Setting[:global_sidebar_block] = ''
  Setting[:show_community_stats] = 'on'
  Setting[:allow_markdown_in_topics] = 'off'
  Setting[:allow_markdown_in_comments] = 'off'
  Setting[:allow_markdown_in_pages] = 'on'
  Setting[:topic_editable_period_str] = '5'
  Setting[:reward_title] = '银币'
  Setting[:sticky_topics_heading] = '置顶话题'
  Setting[:latest_topics_heading] = '最新讨论'
  Setting[:topic_list_style] = 'complex'

  #静态配置
  config.site_name = '骑趣'
  config.site_keyword = 'qixingzhongguo'
  config.site_description = 'qixingzhongguo'

end

