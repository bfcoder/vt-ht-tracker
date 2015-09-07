# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

setting = Setting.first
setting = Setting.create(mode: 'visiting_teaching') if setting.nil?

admin_email = 'admin@example.com'
admin = User.find_by(email: admin_email)
if(!admin)
  puts "creating admin user"
  admin = User.new
  admin.username = 'admin'
  admin.email = admin_email
  password = 'asdfasdf'
  admin.password = password
  admin.password_confirmation = password
  admin.roles = [:admin]
  admin.save
  puts "Admin user has been created."
  puts "Please login with"
  puts "username: admin"
  puts "password: asdfasdf"
  puts "and change your password!"
end
