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

ActiveRecord::Schema.define(:version => 20130528224815) do

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