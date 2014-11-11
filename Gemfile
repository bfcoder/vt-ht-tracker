source 'https://rubygems.org'

ruby '2.1.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.7'

# Database
gem "pg"

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# authentication, authorization, integrations
gem 'devise'
gem 'cancancan'

# UI
gem 'sass-rails', '~> 4.0.3'
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'autoprefixer-rails'

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_21]
end

group :development, :test do
  gem 'byebug'
  gem 'factory_girl_rails'
  gem 'pry'

  gem "rspec-rails"
  gem 'rspec-its'
  gem 'rspec-activemodel-mocks'

  # Guard
  gem 'guard'
  gem 'guard-bundler'
  gem 'guard-rspec', require: false
  gem 'rb-inotify', require: false
  gem 'rb-fsevent', require: false
  gem 'rb-fchange', require: false
end

group :test do
  gem 'database_cleaner'
end

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
