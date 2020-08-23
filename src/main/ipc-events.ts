import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { IpcChannel } from '@src/common/models'
import { appSettings } from './store'

export function registerIpcHandlers() {
    ipcMain.handle(IpcChannel.FirePing,
        (event: IpcMainInvokeEvent, arg: unknown) => {
            console.log(arg)
            return 'Pong from main'
        },
    )
    ipcMain.on(
        IpcChannel.GetAppSettings,
        event => event.sender.send(IpcChannel.GetAppSettings, appSettings.getValue()),
    )
    ipcMain.on(
        IpcChannel.SetAppSettings,
        (_event, args) => {
            appSettings.next(args)
        },
    )
}
