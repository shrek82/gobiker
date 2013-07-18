class Test
  def prr

    1.month.from_now

    1.month.a

    #当前日期
    t=DateTime.current

    #开始日
    t.beginning_of_day()

    #开始小时
    t.beginning_of_hour()

    #开始发的分钟
    t.beginning_of_minute()

    #当天最晚时刻
    t.end_of_day()

    end_of_hour()

    end_of_minute()

    #=================================================


    #本月开始日期
    Time.now.beginning_of_month
    #=>2013-07-01 00:00:00 +0800

    #本月结束日期
    Time.now.end_of_month
    #=>2013-07-31 23:59:59 +0800

    #昨天
    Time.now.yesterday

    #明天
    Time.now.tomorrow

    Time.now + 6.hours

    #返回当前日期
    #如果设置了Time.zone或config.config.time_zone，否则返回Date.today
    #Time.zone.today

    #判断日期是否过去
    Time.now.past? false
    (Time.now-1).past? true

    #判断是否为今天的日期
    Time.now.today?
    Time.now.tomorrow.today?

    #判断是否为未来的日子
    Time.now.future?

    Date.strptime('2001-02-03', '%Y-%m-%d')


    Date.today

    d = DateTime.parse('3rd Feb 2001 04:05:06+03:30')
         d.hour               #=> 4
         d.min                #=> 5
         d.sec                #=> 6
         d.offset             #=> (7/48)
         d.zone               #=> "+03:30"

    dd=Date._parse('2001-02-03') #=> {:year=>2001, :mon=>2, :mday=>3}
    dd.hour

    Date.current
    #=>Thu, 18 Jul 2013

    DateTime.current
    #=>Thu, 18 Jul 2013 11:12:50 +0800


    DateTime.new(2012, 8, 29, 22, 35, 0).change(day: 1)              # => DateTime.new(2012, 8, 1, 22, 35, 0)
    DateTime.new(2012, 8, 29, 22, 35, 0).change(year: 1981, day: 1)  # => DateTime.new(1981, 8, 1, 22, 35, 0)
    DateTime.new(2012, 8, 29, 22, 35, 0).change(year: 1981, hour: 0) # => DateTime.new(1981, 8, 29, 0, 0, 0)

    Time.zone = 'Hawaii'             # => 'Hawaii'
    DateTime.new(2000).in_time_zone  # => Fri, 31 Dec 1999 14:00:00 HST -10:00


    1.month.from_now

    2.years.from_now

    (4.months + 5.years).from_now

    Time.now + 1.day #是指明天这个时候
    Time.now.at_beginning_of_day  + 1.day #明天的刚刚开始的0时0分0秒

    Time.now + 1.day

    time_string = "2010-07-21 11:52:31"

    helper.time_ago_in_words(time_string) # => about 5 hours

    time_string.to_time # => Wed Jul 21 11:52:31 UTC 2010

    time_string.to_date # => Wed Jul 21 11:52:31 UTC 2010

    "1-1-2012".to_datetime            #=> Sun, 01 Jan 2012 00:00:00 +0000
    "01/01/2012 23:59:59".to_datetime #=> Sun, 01 Jan 2012 23:59:59 +0000
    "2012-12-13 12:50".to_datetime    #=> Thu, 13 Dec 2012 12:50:00 +0000
    "12/13/2012".to_datetime          #=> ArgumentError: invalid date

    times_ago_in_words(comment.created_at)

    1.second.ago
    1.hours.ago
    1.day.ago

    Date.new(2007, 5, 12).change(day: 1)               # => Date.new(2007, 5, 1)
    Date.new(2007, 5, 12).change(year: 2005, month: 1) # => Date.new(2005, 1, 12)

    date = Date.new(2007, 11, 10)       # => Sat, 10 Nov 2007

    date.to_formatted_s(:db)            # => "2007-11-10"
    date.to_s(:db)                      # => "2007-11-10"

    date.to_formatted_s(:short)         # => "10 Nov"
    date.to_formatted_s(:long)          # => "November 10, 2007"
    date.to_formatted_s(:long_ordinal)  # => "November 10th, 2007"
    date.to_formatted_s(:rfc822)        # => "10 Nov 2007"

    10.minutes.from_now
    1.month.from_now


    Time.now.to_param
    #=>"2013-07-18 13:08:31 +0800"

    time_ago_in_words(3.minutes.from_now)                 # => 3 minutes
    time_ago_in_words(3.minutes.ago)                      # => 3 minutes
    time_ago_in_words(Time.now - 15.hours)                # => about 15 hours
    time_ago_in_words(Time.now)                           # => less than a minute
    time_ago_in_words(Time.now, include_seconds: true) # => less than 5 seconds

    from_time = Time.now - 3.days - 14.minutes - 25.seconds
    time_ago_in_words(from_time)      # => 3 days

    from_time = (3.days + 14.minutes + 25.seconds).ago
    time_ago_in_words(from_time)      # => 3 days


    Time.now.year
    time = Time.new

# Components of a Time
    puts "Current Time : " + time.inspect
    puts time.year    # => Year of the date
    puts time.month   # => Month of the date (1 to 12)
    puts time.day     # => Day of the date (1 to 31 )
    puts time.wday    # => 0: Day of week: 0 is Sunday
    puts time.yday    # => 365: Day of year
    puts time.hour    # => 23: 24-hour clock
    puts time.min     # => 59
    puts time.sec     # => 59
    puts time.usec    # => 999999: microseconds
    puts time.zone    # => "UTC": timezone name

  end
end