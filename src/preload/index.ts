import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { IpcChannel } from "@src/common/enums"


contextBridge.exposeInMainWorld('electron', {
    invoke: <T>(channel: IpcChannel, data: T) => ipcRenderer.invoke(channel, data),
    send: <T>(channel: IpcChannel, data: T) => ipcRenderer.send(channel, data),
    on: <T>(channel: IpcChannel, func: (event: IpcRendererEvent, ...args: T[]) => void) => {
        ipcRenderer.on(channel, func)
    },
    removeListener: (channel: IpcChannel, listener: (...args: unknown[]) => void) => ipcRenderer.removeListener(channel, listener),
    removeAllListeners: (channel: IpcChannel) => ipcRenderer.removeAllListeners(channel),
})