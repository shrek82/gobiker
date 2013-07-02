=begin

RAILS_ENV=production rake db:create db:schema:load

:binary
:boolean
:date
:datetime
:decimal
:float
:integer
:primary_key
:string
:text
:time
:timestamp
$ rails generate migration AddPartNumberToProducts part_number:string
$ rails generate migration RemovePartNumberFromProducts part_number:string
$ rails generate migration AddDetailsToProducts part_number:string price:decimal
rails generate scaffold routes title:string short_title:string tags:string category_id:integer user_id:integer img_path:string banner_path:string province_id:integer city_id:integer duration:integer distance:integer starting:string destination:string intro:string content:text source:string been_num:integer interested_num:integer favorites_num:integer hits_num:integer good_num:integer along_the_scenic:string is_recommended:boolean is_fixed:boolean recommendation_index:integer landscape_index:integer road_index:integer map:string
rails g scaffold Users username:string password:string email:string reg_date:datetime login_date:datetime avatar_path:string point:integer memo:string -f
=end