const { Gdk, Gtk } = imports.gi;
import { App, Service, Utils, Widget } from './imports.js';
const { execAsync, exec } = Utils;

// import { ModuleLeftSpace } from "./leftspace.js";
// import { ModuleRightSpace } from "./rightspace.js"; 
import { ModuleSystem } from "./system.js";
import { ModuleWorkspaces } from "./workspaces.js";


const left = Widget.Box({
    className: 'bar-sidemodule',
});

const center = Widget.Box({
    children: [
        ModuleWorkspaces(),
    ],
});

const right = Widget.Box({
    className: 'bar-sidemodule',
    children: [ModuleSystem()],
});

const Center2 =  () => Widget.Box({
    className: 'spacing-h--20',
    children: [
                left,
                center,
                right,
    ],
});

export default monitor => Widget.Window({
    name: 'bar${monitor}',
    exclusive: true,
    monitor,
    anchor: ['top', 'left', 'right'],
    visible: true,
    child: Widget.CenterBox({
        className: 'bar-bg',
	startWidget: left,
        centerWidget: center,
        endWidget: right,
        // startWidget: ,
        // centerWidget: Center2(),
	// Widget.Box({
        //     className: 'spacing-h--20',
        //     children: [
        //         left,
        //         center,
        //         right,
        //     ]
        // }),
        // endWidget: ,

        // setup: (self) => {
        //     const styleContext = self.get_style_context();
        //     const minHeight = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL);

        //     // execAsync(['bash', '-c', `hyprctl keyword monitor ,addreserved,${minHeight},0,0,0`]).catch(print);
        // }
    }),
});
