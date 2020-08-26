declare interface Window {
    electron: {
        invoke<T, R>(channel: string, data: T): Promise<R>
        send<T>(channel: string, data: T): void
        on<T>(
            channel: import('@src/common/enums').IpcChannel,
            func: (event: import('electron').IpcRendererEvent, ...args: T[]) => void,
        ): import('electron').IpcRenderer
        removeListener(channel: string, listener: (...args: never[]) => void): import('electron').IpcRenderer
        removeAllListeners(channel: string): import('electron').IpcRenderer
    }
}

declare module '*.css'
