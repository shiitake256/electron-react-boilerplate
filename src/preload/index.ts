import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { IpcChannel } from '@src/common/constants'

contextBridge.exposeInMainWorld('electron', {
    invoke: <T>(channel: IpcChannel, data: T) => ipcRenderer.invoke(channel, data),
    on: (channel: IpcChannel, func: (event: IpcRendererEvent, ...args: unknown[]) => void) => {
        ipcRenderer.on(channel, func)
    },
})
