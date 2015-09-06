namespace :db do
  desc "Goes through all the Visit models with a status and without any history and saves them to create a history"
  task :add_history_to_visits => :environment do
    Visit.with_content.without_history.find_each do |visit|
      # only have to save the visit to trigger the before_save
      # to create the history
      puts "Saving visit id: #{visit.id}"
      visit.save
    end
    puts "Finished adding history to visits"
  end
end
