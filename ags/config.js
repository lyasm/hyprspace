// importing
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import{ Bar } from './bar.js';
import { weather } from './weather.js';

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, just make it a function
// then you can use it by calling simply calling it


// exporting the config so ags can manage the windows

App.applyCss(`${App.configDir}/style.css`);



export default{
    css: App.configDir + '/style.css',
    stackTraceOnError: true,
    windows: [
        Bar({ monitor: 0 }),
         Bar({ monitor: 1 }),
	 weather(),
    ],
};
