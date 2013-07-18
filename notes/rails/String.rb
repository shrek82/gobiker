#at
#获取字符串
str = "hello"
str.at(0)      #=> "h"
str.at(1..3)   #=> "ell"
str.at(-2)     #=> "l"
str.at(-2..-1) #=> "lo"
str.at(5)      #=> nil
str.at(5..-1)  #=> ""

str = "hello"
str.at(/lo/) #=> "lo"
str.at(/ol/) #=> nil
str.at("lo") #=> "lo"
str.at("ol") #=> nil

#blank?
#对象是否为空
''.blank?                 # => true
'   '.blank?              # => true
'　'.blank?               # => true
' something here '.blank? # => false

#humanize转对象
'employee_salary'.humanize # => "Employee salary"
'author_id'.humanize       # => "Author"

#美化为标题
'man from the boondocks'.titleize # => "Man From The Boondocks"
'x-men: the last stand'.titleize  # => "X Men: The Last Stand"

#camelize
# 下划线转换为驼峰
'active_record'.camelize                # => "ActiveRecord"
'active_record'.camelize(:lower)        # => "activeRecord"
'active_record/errors'.camelize         # => "ActiveRecord::Errors"
'active_record/errors'.camelize(:lower) # => "activeRecord::Errors"

#classify()
#根据字符串创建对象名
'egg_and_hams'.classify # => "EggAndHam"
'posts'.classify        # => "Post"

#underscore()
#转换为下下划线
'ActiveModel'.underscore         # => "active_model"
'ActiveModel::Errors'.underscore # => "active_model/errors"



#exclude?
#是否不包含某些字符串
"hello".exclude? "lo" #=> false
"hello".exclude? "ol" #=> true
"hello".exclude? h   #=> false

#first(limit = 1)
str = "hello"
str.first    #=> "h"
str.first(1) #=> "h"
str.first(2) #=> "he"
str.first(0) #=> ""
str.first(6) #=> "hello"

#foreign_key(separate_class_name_and_id_with_underscore = true)
'Message'.foreign_key        # => "message_id"
'Message'.foreign_key(false) # => "messageid"
'Admin::Post'.foreign_key    # => "post_id"

#from
str = "hello"
str.from(0)  #=> "hello"
str.from(3)  #=> "lo"
str.from(-2) #=> "lo"

str = "hello"
str.to(0)  #=> "h"
str.to(3)  #=> "hell"
str.to(-2) #=> "hell"

str = "hello"
str.from(0).to(-1) #=> "hello"
str.from(1).to(-2) #=> "ell"env.production?

#last
str = "hello"
str.last    #=> "o"
str.last(1) #=> "o"
str.last(2) #=> "lo"
str.last(0) #=> ""
str.last(6) #=> "hello"

#pluralize复数形式
'post'.pluralize             # => "posts"
'octopus'.pluralize          # => "octopi"
'sheep'.pluralize            # => "sheep"
'words'.pluralize            # => "words"
'the blue mailman'.pluralize # => "the blue mailmen"
'CamelOctopus'.pluralize     # => "CamelOctopi"
'apple'.pluralize(1)         # => "apple"
'apple'.pluralize(2)         # => "apples"
'ley'.pluralize(:es)         # => "leyes"
'ley'.pluralize(1, :es)      # => "ley"

#singularize
#返回单数形式
'posts'.singularize            # => "post"
'octopi'.singularize           # => "octopus"
'sheep'.singularize            # => "sheep"
'word'.singularize             # => "word"
'the blue mailmen'.singularize # => "the blue mailman"
'CamelOctopi'.singularize      # => "CamelOctopus"
'leyes'.singularize(:es)       # => "ley"


#safe_constantize
#试图寻找一个类，没有返回nil，有返回该对象
'Module'.safe_constantize  # => Module


#tableize
#将驼峰转换为下划线链接


#to_date() Link
#Converts a string to a Date value.

"1-1-2012".to_date   #=> Sun, 01 Jan 2012
"01/01/2012".to_date #=> Sun, 01 Jan 2012
"2012-12-13".to_date #=> Thu, 13 Dec 2012
"12/13/2012".to_date #=> ArgumentError: invalid date

#to_datetime()
"1-1-2012".to_datetime            #=> Sun, 01 Jan 2012 00:00:00 +0000
"01/01/2012 23:59:59".to_datetime #=> Sun, 01 Jan 2012 23:59:59 +0000
"2012-12-13 12:50".to_datetime    #=> Thu, 13 Dec 2012 12:50:00 +0000
"12/13/2012".to_datetime          #=> ArgumentError: invalid date


"13-12-2012".to_time               # => 2012-12-13 00:00:00 +0100
"06:12".to_time                    # => 2012-12-13 06:12:00 +0100
"2012-12-13 06:12".to_time         # => 2012-12-13 06:12:00 +0100
"2012-12-13T06:12".to_time         # => 2012-12-13 06:12:00 +0100
"2012-12-13T06:12".to_time(:utc)   # => 2012-12-13 05:12:00 UTC

#truncate(truncate_at, options = {})
#截取字符串，剩余用...代替
'Once upon a time in a world far far away'.truncate(27)
# => "Once upon a time in a wo..."