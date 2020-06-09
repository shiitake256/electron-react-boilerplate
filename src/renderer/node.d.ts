declare interface Window {
    electron: {
        invoke<T>(channel: string, data: T): Promise<unknown>
        on(
            channel: import('@src/common/constants').IpcChannel,
            func: (event: import('electron').IpcRendererEvent, ...args: unknown[]) => void,
        ): void
    }
}

declare module '*.css'
