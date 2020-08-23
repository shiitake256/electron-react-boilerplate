import Tabbouleh, {JSONSchema, JSONString} from 'tabbouleh'

export type Folder = {
    name: string,
    id?: number
    child?: Folder[]
}

@JSONSchema<AppSettings>({})
export class AppSettings {
    @JSONString
    test?: string
}

@JSONSchema<MailAccount>({
    // required: ['id'],
})
export class MailAccount {
    id = 0
    @JSONString
    displayName?: string
    @JSONString
    address?: string
    @JSONString
    host?: string
    @JSONString
    port?: string
    @JSONString
    user?: string
    @JSONString
    password?: string
}

export const mailAccountSchema = Tabbouleh.generateJSONSchema(MailAccount)
export const appSettingsSchema = Tabbouleh.generateJSONSchema(AppSettings)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IpcData<T = any> {
    key: IpcDataKey
    data: T
}

export enum IpcDataKey {
    GetAccounts,
    OpenAccountManager
}

export enum IpcChannel {
    OpenAccountManager = 'OpenAccountManager',
    FirePing = 'FirePing',
    GetFolders = 'GetFolders',
    OpenAppSettingDialog = "OpenSettings",
    GetAccounts = "GetAccounts",
    SetAccunts = "SetAccunts",
    Test = "Test",
    DownStream = "DownStream",
    UpStream = "UpStream",
    GetAppSettings = "GetAppSettings",
    SetAppSettings = "SetAppSettings"
}
