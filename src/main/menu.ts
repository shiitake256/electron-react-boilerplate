import { MenuItemConstructorOptions, Menu } from "electron";
import { IpcChannel } from "@src/common/enums";


const template: MenuItemConstructorOptions[] = [{
    label: 'Edit',
    submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        // { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        // { role: 'selectall' },
    ],
},
{
    label: 'View',
    submenu: [
        { role: 'reload' },
        // { role: 'forcereload' },
        // { role: 'toggledevtools' },
        { type: 'separator' },
        // { role: 'resetzoom' },
        // { role: 'zoomin' },
        // { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
    ],
},
{ role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
{
    label: 'Tool',
    submenu: [
        {
            label: 'Settings',
            click: (_menuItem, browserWindow) => browserWindow?.webContents?.send(IpcChannel.OpenAppSettingDialog, null),
        },
    ],
},
];

const menu = Menu.buildFromTemplate(template)

export {menu}