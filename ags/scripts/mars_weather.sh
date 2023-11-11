#!/bin/sh

data=$(curl -s 'https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json' | jq '.sols | last')

min_temp=$(echo $data | jq '.min_temp')
max_temp=$(echo $data | jq '.max_temp')
rm ~/.config/ags/data/mars.data
echo ": $min_temp°C : $max_temp°C" > ~/.config/ags/data/mars.data
