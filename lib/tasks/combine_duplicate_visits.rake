namespace :db do
  desc "Goes through all the Sister and Household Visit models and combines duplicates."
  task :combine_duplicate_visits, [:months_back] => :environment do |t, args|
    months_back = args.months_back.to_i
    if months_back.present?
      months_back.times do |num|
        month = Date.today.beginning_of_month - num.months
        Sister.find_each do |sister|
          puts "Updating Sister Visits"
          visits = sister.visits.where(month: month)
          count = visits.count
          if count > 1
            count = count - 1
            visit = visits[0]
            count.times do |n|
              puts "Updating visit id #{visit.id} with visit id #{visits[n+1].id}"
              visit.status = visits[n+1].status if visits[n+1].status.present?
              visit.notes = visits[n+1].notes if visits[n+1].notes.present?
              visit.save
              visits[n+1].histories.each do |history|
                history.update_attributes(visit_id: visit.id)
              end
              visits[n+1].destroy
            end
          end
        end

        Household.find_each do |household|
          puts "Updating Household Visits"
          visits = household.visits.where(month: month)
          count = visits.count
          if count > 1
            count = count - 1
            visit = visits[0]
            count.times do |n|
              puts "Updating visit id #{visit.id} with visit id #{visits[n+1].id}"
              visit.status = visits[n+1].status if visits[n+1].status.present?
              visit.notes = visits[n+1].notes if visits[n+1].notes.present?
              visit.save
              visits[n+1].histories.each do |history|
                history.update_attributes(visit_id: visit.id)
              end
              visits[n+1].destroy
            end
          end
        end
      end
      puts "Finished combining duplicate visits"
    else
      puts "Please provide the number of months to go back."
    end
  end
end
