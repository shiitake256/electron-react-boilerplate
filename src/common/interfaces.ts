import { IpcDataKey } from "@src/common/enums";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IpcData<T = any> {
    key: IpcDataKey
    data: T
}

export type Folder = {
    name: string,
    id?: number
    child?: Folder[]
}