
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