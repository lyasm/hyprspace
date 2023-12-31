import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { execAsync, exec, timeout } from 'resource:///com/github/Aylur/ags/utils.js'
import { range } from './utils.js';
import PopupWindow from './popup.js';

let i = 0;


const phrases = [
	 "oh fuck off I make your entire desktop",
	 "I am a kiddo in some random-ass Irish dorm",
	 "haha pointers hee hee i love pointe-\nProcess Vaxry exited with signal SIGSEGV",
	 "arch is like rick astley to me\nnever gonna let you down",
	 "doki doki waku waku",
	 "I use arch btw",
	 "I like raf because he bans people",
	 "yes I am god I created this Universe",
	 "I will remind you that I make the software \nyou use on your computer daily \nand update without checking the diff. \nJust so you know.",
	 "I am not in danger, \nI am the danger",
	 "my rat in your computer says otherwise",
	 "Oh, warp off—I craft your entire cosmic desktop.",
	 "I'm a space wanderer in some far-flung \nIrish nebula.",
	 "Haha, pointers! Hee-hee, I adore pointe-\nProcess Vaxry exited with signal SIGSEGV.",
	 "Every alternate compositor is like a cosmic pro, \nand we're on the verge of creating our own celestial spectacle. LMAO",
	 "Doki Doki Waku Waku in zero gravity.",
	 "I traverse the universe with Arch, by the way.",
	 "I appreciate Raf because he cosmic-bans entities.",
	 "Yes, I am a cosmic deity; I birthed this Universe.",
	 "I'll remind you that I forge the code for your galactic \ndaily software updates without consulting the diff. \nJust so you know.",
	 "I'm not in cosmic peril; I am the cosmic peril.",
];

const b = () => Widget.Box({
	 vertical: true,
	 children: [
		  Widget.Label({label: 'Vaxry says:', css: 'font-size: 18px;'}),
		  Widget.Button({
		  label: phrases[Math.floor(Math.random() * phrases.length)],
		  className: 'name',
		  vpack: 'center',
		  hpack: 'center',
		  onPrimaryClick: self => self.label = phrases[Math.floor(Math.random() * phrases.length)],
	 })],});

 const astronautBoxes = [];
const AstronautBox = () => {
    const astroScroll = Widget.Box ({
		  vertical: true,
	     vexpand: true,
		  children: [
				Widget.Scrollable({
					 hscroll: 'always',
					 vexpand: true,
					 hexpand: false,
					 className: 'animated',
					 child: Widget.Box({
						  vertical: true,
						  vexpand: true,
						  hexpand: false,
						  className: 'animated',
						  connections: [
								[1000000, self => Utils.readFileAsync('/home/lyasm/.config/ags/data/astronaut.json')
								 .then(data0 => {
									  const data1 = JSON.parse(data0);
									  const data = new Map(Object.entries(data1)); // Convert data to a

									  const widget = Widget.Label({vpack: 'center', hpack: 'center', className: 'name'});
									  execAsync(['cat', '/home/lyasm/.config/ags/data/mars.data'])
											.then(date => widget.label = date)
											.catch(console.error);
									  astronautBoxes.push(Widget.Label({label: 'Mars Weather:', css: 'font-size: 20px; margin-top: 10px;',}));
									  astronautBoxes.push(widget);
									  astronautBoxes.push(b());

									  astronautBoxes.push(Widget.Label({label: 'Current Spacepeople:',  css: 'font-size: 20pt; margin-top: 5px;'}));
									  for (const astronaut of data1) {
											const time = /P(?:(\d+)D)?/g.exec(astronaut.time_in_space);
											const days = time[1] ? parseInt(time[1]) : 0;
											const Box = Widget.Box({className: 'Astoimg', css: 'background: url("' + astronaut.profile_image + '"); background-size: contain; background-repeat: no-repeat; background-position: center; min-width: 78px; min-height: 78px; border-radius: 80px;'});
											astronautBoxes.push(
												 Widget.Box({
													  vertical: false,
													  hexpand: false,
													  className: 'nautbox',
													  children: [
															Box,
															Widget.Box({
																 vertical: true,
																 vpack: 'center',
																 hpack: 'center',
																 vexpand: true,
																 children: [ Widget.Label({vpack: 'center', hpack: 'center', label:  astronaut.name, className: 'name'}),
																				 Widget.Label({vpack: 'center', label: 'Time in Space: ' + days + 'd', className: 'spacetime'}) ],
															}),
													  ]
												 })
											);
									  };
									  astronautBoxes.className = 'astroboxes';
									  self.children = astronautBoxes;
									  // self.children = astronautBoxes;
								 })
								 .catch(error => console.error(error)),
								],
						  ],
					 }),
				})],
    });

    return astroScroll;
};

export const weather = () => Widget.Window({
    name: `weather`, // name has to be unique
    className: 'weather_origin',
    anchor: ['top', 'left'],
    exclusive: false,
    focusable: false,
    popup: true,
    margin: [-1, 35],
    child: Widget.Box({
        className: 'weatherbox',
		  vertical: true,
	    vexpand: true,
	children: [
	    AstronautBox(),
	],
    }),
});
