rm ~/.config/ags/data/spaceweather.json
curl -s -X 'GET' 'https://api.nasa.gov/DONKI/notifications?type=all&api_key=TXmwfwyoK8NH950AUNZ22vBSJfV5UvVlI5QorxhO' | jq -c 'map({Type: .messageType, name: .messageID, date: .messageIssueTime, note: .messageBody})' > ~/.config/ags/data/spaceweather.json
