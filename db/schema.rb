# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130802081721) do

  create_table "ads", :force => true do |t|
    t.string   "name"
    t.string   "js_path"
    t.string   "type"
    t.string   "img_path"
    t.string   "info"
    t.string   "url"
    t.integer  "hits"
    t.boolean  "is_close"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "albums", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.integer  "place_id"
    t.integer  "event_id"
    t.integer  "club_id"
    t.integer  "pics_num"
    t.integer  "hits_num"
    t.string   "tags"
    t.string   "cover_path"
    t.integer  "order_num"
    t.boolean  "is_close"
    t.boolean  "is_recommended"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "areas", :force => true do |t|
    t.string   "name"
    t.integer  "city_id"
    t.integer  "area_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "article_categories", :force => true do |t|
    t.string   "name"
    t.integer  "order_num"
    t.string   "img_path"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.integer  "category_id"
    t.integer  "user_id"
    t.string   "tags"
    t.string   "intro"
    t.text     "content"
    t.string   "source"
    t.string   "img_path"
    t.string   "img_ids"
    t.integer  "hits_num"
    t.integer  "useful_num"
    t.integer  "comments_num"
    t.boolean  "is_recommended"
    t.boolean  "is_fixed"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "asks", :force => true do |t|
    t.string   "title",          :limit => 200
    t.string   "intro"
    t.integer  "province_id"
    t.string   "city_integer"
    t.string   "tags",           :limit => 50
    t.integer  "user_id"
    t.integer  "hits_num"
    t.integer  "answers_num"
    t.integer  "useful_num"
    t.integer  "base_answer_id"
    t.boolean  "is_resolved"
    t.boolean  "is_recommended"
    t.boolean  "is_fixed"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  create_table "attacheds", :force => true do |t|
    t.string   "name",             :limit => 50
    t.string   "att",              :limit => 100
    t.boolean  "is_verify"
    t.string   "att_file_name",    :limit => 50
    t.string   "att_content_type", :limit => 20
    t.integer  "att_file_size"
    t.datetime "att_updated_at"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.string   "img",              :limit => 100
    t.string   "img_file_name",    :limit => 50
    t.string   "img_content_type", :limit => 20
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
  end

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.integer  "province_id"
    t.integer  "order_num"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "city_id"
  end

  create_table "comments", :force => true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "place_id"
    t.integer  "route_id"
    t.integer  "bbs_unit_id"
  end

  create_table "event_signs", :force => true do |t|
    t.integer  "event_id"
    t.integer  "user_id"
    t.integer  "num_people"
    t.string   "intro"
    t.boolean  "is_anonymous"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "events", :force => true do |t|
    t.integer  "category_id"
    t.string   "title",             :limit => 200
    t.integer  "subject_id",        :limit => 2
    t.string   "tags",              :limit => 100
    t.string   "intro"
    t.string   "address"
    t.text     "content"
    t.integer  "club_id"
    t.integer  "user_id"
    t.string   "title_color",       :limit => 10
    t.datetime "sign_start_at"
    t.datetime "sign_finish_at"
    t.datetime "start_at"
    t.datetime "finish_at"
    t.integer  "sign_limit"
    t.string   "icon_path",         :limit => 200
    t.string   "img_path",          :limit => 200
    t.boolean  "is_fixed"
    t.boolean  "is_comment"
    t.boolean  "is_recommend"
    t.boolean  "is_closed"
    t.boolean  "is_suspend"
    t.boolean  "is_stop_sign"
    t.boolean  "is_allow_everyone"
    t.integer  "signed_num"
    t.integer  "hits_num"
    t.integer  "comments_num"
    t.integer  "interested_num"
    t.datetime "created_at",                       :null => false
    t.datetime "updated_at",                       :null => false
  end

  create_table "forums", :force => true do |t|
    t.string   "name",        :limit => 20
    t.string   "intro"
    t.integer  "province_id"
    t.integer  "city_id"
    t.integer  "club_id"
    t.integer  "topics_num"
    t.integer  "order_num"
    t.boolean  "is_systemic"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.string   "ico_path",    :limit => 250
  end

  create_table "guide_categories", :force => true do |t|
    t.string   "name"
    t.integer  "order_num"
    t.string   "img_path"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "guides", :force => true do |t|
    t.string   "title"
    t.integer  "category_id"
    t.integer  "user_id"
    t.string   "tags"
    t.string   "intro"
    t.text     "content"
    t.string   "source"
    t.string   "img_path"
    t.string   "img_ids"
    t.integer  "hits_num"
    t.integer  "useful_num"
    t.integer  "comments_num"
    t.boolean  "is_recommended"
    t.boolean  "is_fixed"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "managers", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password"
    t.datetime "login_at"
    t.string   "role"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "options", :force => true do |t|
    t.string   "name",       :limit => 50
    t.string   "key_name"
    t.string   "value"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  create_table "permissions", :force => true do |t|
    t.string   "action"
    t.string   "subject"
    t.string   "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "permissions_users", :id => false, :force => true do |t|
    t.integer "permission_id"
    t.integer "user_id"
  end

  add_index "permissions_users", ["permission_id", "user_id"], :name => "index_permissions_users_on_permission_id_and_user_id"
  add_index "permissions_users", ["user_id", "permission_id"], :name => "index_permissions_users_on_user_id_and_permission_id"

  create_table "photos", :force => true do |t|
    t.string   "title",                 :limit => 50
    t.string   "img_path",              :limit => 150
    t.boolean  "is_verify"
    t.datetime "created_at",                           :null => false
    t.datetime "updated_at",                           :null => false
    t.string   "img_path_file_name",    :limit => 30
    t.string   "img_path_content_type", :limit => 20
    t.string   "img_path_file_size",    :limit => 10
    t.datetime "img_path_updated_at"
  end

  create_table "places", :force => true do |t|
    t.string   "name"
    t.string   "intro"
    t.text     "content"
    t.integer  "user_id"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.integer  "category_id"
    t.string   "img_path"
    t.string   "banner_path"
    t.integer  "province_id"
    t.integer  "city_id"
    t.integer  "area_id"
    t.string   "tags"
    t.string   "map"
    t.string   "source"
    t.integer  "been_num",       :default => 0
    t.integer  "interested_num", :default => 0
    t.integer  "favorites_num",  :default => 0
    t.integer  "hits_num",       :default => 0
    t.integer  "good_num",       :default => 0
    t.boolean  "is_recommended", :default => false
    t.boolean  "is_fixed",       :default => false
    t.string   "address"
    t.integer  "comments_num",   :default => 0
    t.string   "img_ids"
    t.integer  "rating"
  end

  create_table "places_tags", :id => false, :force => true do |t|
    t.integer "place_id"
    t.integer "tag_id"
  end

  create_table "provinces", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "province_id"
  end

  create_table "recommends", :force => true do |t|
    t.string   "name"
    t.string   "category"
    t.string   "img_path"
    t.integer  "order_num"
    t.string   "redirect"
    t.string   "intro"
    t.boolean  "is_close"
    t.boolean  "is_fixed"
    t.integer  "hits"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "img_ids"
  end

  create_table "routes", :force => true do |t|
    t.string   "title"
    t.string   "short_title"
    t.string   "tags"
    t.integer  "category_id"
    t.integer  "user_id"
    t.string   "img_path"
    t.string   "banner_path"
    t.integer  "province_id"
    t.integer  "city_id"
    t.integer  "duration"
    t.integer  "distance"
    t.string   "starting"
    t.string   "destination"
    t.string   "intro"
    t.text     "content"
    t.string   "source"
    t.integer  "been_num"
    t.integer  "interested_num"
    t.integer  "favorites_num"
    t.integer  "hits_num"
    t.integer  "good_num"
    t.string   "along_the_scenic"
    t.boolean  "is_recommended"
    t.boolean  "is_fixed"
    t.integer  "recommendation_index"
    t.integer  "landscape_index"
    t.integer  "road_index"
    t.string   "map"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.integer  "area_id"
    t.integer  "place_id"
    t.integer  "rating"
  end

  create_table "settings", :force => true do |t|
    t.string   "var",                      :null => false
    t.text     "value"
    t.integer  "thing_id"
    t.string   "thing_type", :limit => 30
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  add_index "settings", ["thing_type", "thing_id", "var"], :name => "index_settings_on_thing_type_and_thing_id_and_var", :unique => true

  create_table "studies", :force => true do |t|
    t.string   "name"
    t.string   "intro"
    t.boolean  "is_close"
    t.datetime "login_at"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tags", :force => true do |t|
    t.string   "name"
    t.integer  "num"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "thread_moderators", :force => true do |t|
    t.integer  "thread_id"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "topics", :force => true do |t|
    t.string   "title",                  :limit => 150
    t.integer  "forum_id"
    t.integer  "subject_id"
    t.integer  "club_id"
    t.integer  "user_id"
    t.string   "title_color",            :limit => 10
    t.boolean  "is_fixed"
    t.boolean  "is_comment"
    t.boolean  "is_good"
    t.boolean  "is_recommend"
    t.integer  "hits_num"
    t.integer  "comments_num"
    t.integer  "last_comment_user_id"
    t.string   "last_comment_user_name", :limit => 50
    t.datetime "last_comment_time"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.text     "content"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password"
    t.string   "email"
    t.datetime "reg_date"
    t.datetime "login_date"
    t.string   "avatar_path"
    t.integer  "point"
    t.string   "memo"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
