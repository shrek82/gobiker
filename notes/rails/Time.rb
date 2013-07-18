#:short => '%e %b',
# :long => '%B %e, %Y',
# :db => '%Y-%m-%d',
# :number => '%Y%m%d',

Time.new.to_s(:db)
"2013-07-18 13:49:48"

Time.new
#=>2013-07-18 13:49:25 +0800

Time.now
#=>2013-07-18 13:49:25 +0800