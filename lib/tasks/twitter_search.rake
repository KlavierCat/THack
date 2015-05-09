namespace :twitter_search do


  task :search => :environment do
    lines = IO.readlines("nlp/travel_activities.txt")
    lines.each do |line|
      activity_keywords = line.split(',')

      begin
        $twitter_client.search(activity_keywords[1].strip, lang: 'en', count: '100').each do |tweet|
          puts tweet.text
          begin
            File.open("nlp/#{activity_keywords[0]}/#{activity_keywords[0]}.txt",'a'){ |f| f << "#{tweet.text}\n"}
          rescue Errno::ENOENT => e
            Dir.mkdir "nlp/#{activity_keywords[0]}"
            retry
          end

        end
      rescue Twitter::Error::TooManyRequests => e
        puts 'Running into ratelimiting, waiting...'
        Thread.sleep(3600)
      end

    end
  end

end
