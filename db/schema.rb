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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150904035133) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "districts", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "districts", ["name"], name: "index_districts_on_name", unique: true, using: :btree

  create_table "histories", force: :cascade do |t|
    t.datetime "month"
    t.string   "status"
    t.string   "notes"
    t.integer  "visit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "histories", ["visit_id"], name: "index_histories_on_visit_id", using: :btree

  create_table "households", force: :cascade do |t|
    t.integer  "district_id"
    t.string   "name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "teachers"
  end

  add_index "households", ["district_id"], name: "index_households_on_district_id", using: :btree

  create_table "settings", force: :cascade do |t|
    t.string   "mode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sisters", force: :cascade do |t|
    t.integer  "district_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "teachers"
  end

  add_index "sisters", ["district_id"], name: "index_sisters_on_district_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "roles_mask"
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "visits", force: :cascade do |t|
    t.datetime "month"
    t.string   "status"
    t.integer  "sister_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "notes"
    t.integer  "household_id"
  end

  add_index "visits", ["household_id"], name: "index_visits_on_household_id", using: :btree
  add_index "visits", ["month"], name: "index_visits_on_month", using: :btree
  add_index "visits", ["sister_id"], name: "index_visits_on_sister_id", using: :btree
  add_index "visits", ["status"], name: "index_visits_on_status", using: :btree

end
