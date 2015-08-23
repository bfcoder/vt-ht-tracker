source 'https://rubygems.org'

ruby '2.1.5'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
gem 'unicorn'

# Database
gem "pg"

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# authentication, authorization, integrations
gem 'devise'
gem 'cancancan'

# UI
gem 'sass-rails'
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'autoprefixer-rails'
gem 'momentjs-rails'

# Chosen
gem 'chosen-rails'
gem 'bootstrap-chosen-rails'

# Ember
gem 'ember-rails'
gem 'ember-source', '1.9.1'
gem 'ember-data-source', '1.0.0.beta.14.1'
gem 'active_model_serializers', '~> 0.8.3'

# Error notifications
gem 'rollbar'

# Heroku Stuff
group :production do
  gem 'rails_12factor'
end

group :development do
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem "spring-commands-rspec"

  gem 'better_errors'
  gem 'binding_of_caller', :platforms=>[:mri_21]
end

group :development, :test do
  gem 'byebug'
  gem 'factory_girl_rails'
  gem 'pry'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  gem 'faker'

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
