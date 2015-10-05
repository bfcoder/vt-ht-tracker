if Rails.env.to_s == 'development'
  HEROKU_STAGING = 'vt-tracker-staging'
  HEROKU_PRODUCTION = 'vt-tracker'
  LOCAL_DB = YAML.load_file("#{::Rails.root.to_s}/config/database.yml")['development']['database']

  namespace :db do
    desc "Make a backup of production and clone it to staging"
    task(clone_production_to_staging: :environment) do
      puts "Putting #{HEROKU_STAGING} into maintenance mode.."
      puts `heroku maintenance:on --app #{HEROKU_STAGING}`
      puts "Capturing #{HEROKU_PRODUCTION} database.."
      puts `heroku pg:backups capture --app #{HEROKU_PRODUCTION}`
      puts "Overwriting #{HEROKU_STAGING} database with data from #{HEROKU_PRODUCTION}.."
      puts `heroku pg:backups restore \`heroku pg:backups public-url --app #{HEROKU_PRODUCTION}\` DATABASE_URL --app #{HEROKU_STAGING} --confirm #{HEROKU_STAGING}`
      puts "Running migrations on #{HEROKU_STAGING}.."
      puts `heroku run rake db:migrate --app #{HEROKU_STAGING}`
      puts "Taking #{HEROKU_STAGING} out of maintenance mode.."
      puts `heroku maintenance:off --app #{HEROKU_STAGING}`
      puts "Done."
    end

    desc "Copy the production database to local"
    task clone_prod: :environment do
      db = ActiveRecord::Base.configurations
      sh "heroku pg:backups capture --app #{HEROKU_PRODUCTION}"
      file_path="~/Downloads/db_#{db[Rails.env]['database']}_#{Time.now.strftime('%Y%m%dT%H%M')}.dump"
      sh "curl -vs `heroku pg:backups public-url --app #{HEROKU_PRODUCTION}` > #{file_path}"
      puts `pg_restore --verbose --clean --no-acl --no-owner -h localhost -U #{db[Rails.env]['username']} -d #{LOCAL_DB} #{file_path}`
      User.all.each {|u| u.update_attribute(:password, 'aoeuaoeu')}
    end

    desc "Copy the staging database to local"
    task clone_staging: :environment do
      db = ActiveRecord::Base.configurations
      sh "heroku pg:backups capture --app #{HEROKU_STAGING}"
      file_path="~/Downloads/db_#{db[Rails.env]['database']}_#{Time.now.strftime('%Y%m%dT%H%M')}.dump"
      sh "curl -vs `heroku pg:backups public-url --app #{HEROKU_STAGING}` > #{file_path}"
      puts `pg_restore --verbose --clean --no-acl --no-owner -h localhost -U #{db[Rails.env]['username']} -d #{LOCAL_DB} #{file_path}`
      User.all.each {|u| u.update_attribute(:password, 'aoeuaoeu')}
    end
  end

end
