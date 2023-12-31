import Notifications from 'resource:///com/github/Aylur/ags/service/notifications.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import { execAsync, exec, timeout } from 'resource:///com/github/Aylur/ags/utils.js'
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';

console.log('Test');
import ModuleWorkspace from './workspaces.js';


const Clock = () => Widget.Label({
    className: 'clock',
    connections: [
        [500, self => execAsync(['date', '+%H:%M:%S | %-d. %^b'])
            .then(date => self.label = date).catch(console.error)],
    ],
});

const Sep = () => Widget.Label({
    className: 'Seperator',
    label: '|',
});

// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself
const Notification = () => Widget.Box({
    className: 'notification',
    children: [
        Widget.Icon({
            icon: 'preferences-system-notifications-symbolic',
            connections: [
                [Notifications, self => self.visible = Notifications.popups.length > 0],
            ],
        }),
        Widget.Label({
            connections: [[Notifications, self => {
                self.label = Notifications.popups[0]?.summary || '';
            }]],
        }),
    ],
});

const Volume = () => Widget.Box({
    className: 'volume',
    css: 'min-width: 100px; margin-left: 400px;',
    children: [
        Widget.Stack({
            items: [
                // tuples of [string, Widget]
                ['101', Widget.Icon('audio-volume-overamplified-symbolic')],
                ['67', Widget.Icon('audio-volume-high-symbolic')],
                ['34', Widget.Icon('audio-volume-medium-symbolic')],
                ['1', Widget.Icon('audio-volume-low-symbolic')],
                ['0', Widget.Icon('audio-volume-muted-symbolic')],
            ],
            connections: [[Audio, self => {
                if (!Audio.speaker)
                    return;

                if (Audio.speaker.isMuted) {
                    self.shown = '0';
                    return;
                }

                const show = [101, 67, 34, 1, 0].find(
                    threshold => threshold <= Audio.speaker.volume * 100);

                self.shown = `${show}`;
            }, 'speaker-changed']],
        }),
        Widget.Slider({
            hexpand: true,
            drawValue: false,
            onChange: ({ value }) => Audio.speaker.volume = value,
            connections: [[Audio, self => {
                self.value = Audio.speaker?.volume || 0;
            }, 'speaker-changed']],
        }),
    ],
});


const BatteryLabel = () => Widget.Box({
    className: 'batbox',
	children: [ Widget.CircularProgress({
		className: 'progress',
		binds: [
			['value', Battery, 'percent', p => p > 0 ? 1 - p / 100 : 0],
		],
		rounded: false,
		inverted: false,
		startAt: 0.75,
		child: Widget.Icon({
			binds: [['icon', Battery, 'icon-name']],
			className: 'Battery_Icon',
		}),
	})],
});
const Cpu = () => Widget.Box({
	className: 'cpubox',
	children: [Widget.CircularProgress({
		className: 'cpu_progress',
		connections: [
			[500, self => execAsync(['bash', '-c', '~/.config/ags/scripts/cpu.sh'])
			 .then(cpu => self.value =  (cpu / 100))
			 .then(cpu => self.className = (cpu / 100) > 0.8 ? 'cpu_progress_high' : 'cpu_progress')
				.catch(console.error)]
		],
		rounded: false,
		inverted: false,
		startAt: 0.75,
	})],
});

const Mem = () => Widget.Box({
	className: 'membox',
	children: [ Widget.CircularProgress({
		className: 'mem_progress',
		connections: [
			[500, self => execAsync(['bash', '-c', "free -m | grep Mem | awk '{print ($3/$2)}'"])
				.then(mem => self.value = mem / 1)
				.then(mem => self.className = mem > 0.8 ? 'mem_progress_high' : 'mem_progress')
				.catch(console.error)]
		],
		rounded: false,
		inverted: false,
		startAt: 0.75,
	})],
});

const SysTrayItem = item => Widget.Button({
    className: 'SystrayItem',
    child: Widget.Icon({ binds: [['icon', item, 'icon']] }),
    binds: [['tooltip-markup', item, 'tooltip-markup']],
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

const SysTray = () =>  Widget.Box({
    className: 'Systray',
    binds: [['children', SystemTray, 'items', i => i.map(SysTrayItem)]],
});

const Wallpaper = () => Widget.Button({
    css: 'border: 1px solid #dde1e6; border-radius: 4px; background: #262626;',
    connections: [
	[1000, self => execAsync(['bash', '-c', "cat ~/ricing-collection/scripts/.wall-list | head -n 1 | echo 'NEW WALL'"])
				.then(mem => self.label = mem)
				.catch(console.error)]],
    onPrimaryClick: () => execAsync(['bash', '-c', "~/ricing-collection/scripts/random_wal.sh"]),
});

const WeatherWidget = (Home) => {
    const widget = Widget.Label();
        if (Home % 3 === 1) {
            execAsync(['cat', '/home/lyasm/.config/ags/data/weather.home'])
                .then(date => widget.label = date)
                .catch(console.error);
        } else if (Home % 3 === 2) {
            execAsync(['curl', 'wttr.in/?format=%c%t'])
                .then(date => widget.label = date)
                .catch(console.error);
        } else {
            execAsync(['cat', '/home/lyasm/.config/ags/data/mars.data'])
                .then(date => widget.label = date)
                .catch(console.error);
        }
    return widget;
};


let Home = 2;
const Weather = () => {
    const widgetBox = Widget.Box({
	children: [WeatherWidget(Home)],
    });
    const eventBox = Widget.EventBox({
        className: 'clock',
        // child: widgetBox,
        onSecondaryClick: () => {
            Home++;
        },
        onPrimaryClick: () => App.toggleWindow('weather'),
    });
    eventBox.child = WeatherWidget(Home);

    return eventBox;
};

// layout of the bar
const Left = () => Widget.Box({
    children: [
        SysTray(),
	Sep(),
	Weather(),
	Sep(),
	Wallpaper(),
        Notification(),
    ],
});

const Center = () => Widget.Box({
    children: [
        ModuleWorkspace(),
    ],
});

const Right = () => Widget.Box({
    halign: 'end',
    children: [
        Volume(),
	Sep(),
	Cpu(),
	Mem(),
        BatteryLabel(),
	Sep(),
        Clock(),
    ],
});

export const Bar = ({ monitor } = {}) => Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    className: 'bar_origin',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    child: Widget.CenterBox({
        className: 'bar',
        startWidget: Left(),
        centerWidget: Center(),
        endWidget: Right(),
    }),
});
