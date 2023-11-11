rm ~/.config/ags/data/weather.home
touch ~/.config/ags/data/weather.home
curl 'wttr.in/Gramastetten?format=%c%t' -o ~/.config/ags/data/weather.home
