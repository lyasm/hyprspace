console.log('Test');
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { range } from './utils.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';

const dispatch = ws => Utils.execAsync(`hyprctl dispatch workspace ${ws}`)

const greeknums = [
    { value: '1', greek: 'α' },
    { value: '2', greek: 'β'},
    { value: '3', greek: 'γ'},
    { value: '4', greek: 'δ' },
    { value: '5', greek: 'ε' },
    { value: '6', greek: 'ϛ' },
    { value: '7', greek: 'ζ' },
    { value: '8', greek: 'η' },
    { value: '9', greek: 'θ' },
    { value: '10', greek: 'ι' },
];

const togreek = num => {
    const numb = greeknums.find(item => item.value === num);
    return numb ? numb.greek : 'π';
};


export default () => Widget.Box({
    className: 'workspaces',
    connections: [[Hyprland.active.workspace, self => {
        const uniqueWorkspaces = [];
        Hyprland.workspaces.forEach(workspace => {
            if (!uniqueWorkspaces.includes(workspace.name)) {
                uniqueWorkspaces.push(workspace.name);
            }
        });
	    uniqueWorkspaces.sort();

		self.children = uniqueWorkspaces.map(workspaceName => {
			const isFocused = Hyprland.active.workspace.name === workspaceName;
			return Widget.Overlay({
				child: Widget.Label({ label: ` `, xalign: 0.5, className: isFocused ? 'bg-focused' : 'bg-ws'}),
				overlays:[
				Widget.Button({
					onClicked: () => {
						const foundWorkspace = Hyprland.workspaces.find(workspace => workspace.name === workspaceName);
						if (foundWorkspace) {
							execAsync(`hyprctl dispatch workspace ${foundWorkspace.id}`);
						}
					},
				    child: Widget.Label({label: togreek(workspaceName), xalign: 0.5 }),
					className: isFocused ? 'focused' : '',
				}),
				Widget.Box({ className: isFocused ? 'orbiter' : 'nu' }),
				],
				pass_through: true,
			});
		});

		//dont del! ι
    }
				   ]]
});
