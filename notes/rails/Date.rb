#:short => '%e %b',
# :long => '%B %e, %Y',
# :db => '%Y-%m-%d',
# :number => '%Y%m%d',

#属性-------------------------------------------
#当天所在周开始天数
#可以接收1个参数
#symbols: :monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday
#1、Attributes()

Date.new(2013,7,18).beginning_of_week()
Date.new(2013,7,18).beginning_of_week().to_s
#"2013-07-15"
Date.new(2013,7,18).beginning_of_week(:tuesday).to_s
#"2013-07-16"

#2、当前日期
#如果设置了Time.zone或config.config.time_zone，否则返回Date.today
Date.current
#=>Thu, 18 Jul 2013

Date.new(2001,12,12)
#=>Wed, 12 Dec 2001

#、返回明天
Date.tomorrow()

#返回昨天
Date.yesterday

#Instance Public methods
#实例公共方法------------------------------------------------------------

#change
#修改日期
Date.new(2007, 5, 12).change(day: 1)               # => Date.new(2007, 5, 1)
Date.new(2007, 5, 12).change(year: 2005, month: 1) # => Date.new(2005, 1, 12)

#to_default_s
#同to_s
#转换为默认的日期格式
d=Date.current
d.to_default_s
#=>"2013-07-18"

date.to_formatted_s(:db)            # => "2007-11-10"
date.to_s(:db)                      # => "2007-11-10"
ate.to_formatted_s(:short)         # => "10 Nov"
date.to_formatted_s(:long)          # => "November 10, 2007"
date.to_formatted_s(:long_ordinal)  # => "November 10th, 2007"
date.to_formatted_s(:rfc822)        # => "10 Nov 2007"

#转换为时间
d.to_time
#=>2013-07-18 00:00:00 +0800
d.to_time(:local)
d.to_time(:utc)

#========================================================
#DateAndTime

#日期所在月初
beginning_of_month()
d.beginning_of_month()
#=>Mon, 01 Jul 2013

#返回月季的第1天
beginning_of_quarter()

#返回开始的周
beginning_of_week

#返回开始的年初
beginning_of_year()

DAYS_INTO_WEEK	=	{ :monday => 0, :tuesday => 1, :wednesday => 2, :thursday => 3, :friday => 4, :saturday => 5, :sunday => 6 }

#返回月末
end_of_month()

end_of_quarter()

end_of_week

end_of_year


#是否是今天
today?

#是否是昨天
yesterday()

#未来的日期
future?()

#在过去
past?()

#返回每周星期一
d.monday()

#返回几个月前
months_ago()
weeks_ago(weeks)
years_ago(years)


#返回2个月后
months_since(months)
weeks_since(weeks)
years_since(years)

#下月
next_month(default=1)
prev_month()

#下个季度
next_quarter(default=1)
prev_quarter()

next_week
prev_week

next_year()
prev_year()

#本周日
sunday()

#明天
tomorrow()





