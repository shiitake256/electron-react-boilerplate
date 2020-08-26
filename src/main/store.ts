import { BehaviorSubject } from 'rxjs'
import { BrowserWindow } from 'electron'
import ElectronStore from 'electron-store'
import { Configs } from './enums'
import { IpcChannel } from '@src/common/enums'
import { AppSettings, appSettingsSchema} from '@src/common/models'
import { utils } from '@rjsf/core'
import { skip } from 'rxjs/operators'

const electronStore = new ElectronStore()

export const appSettings = new BehaviorSubject<AppSettings>((electronStore.get(
    Configs[Configs.AppSettings],
    utils.getDefaultFormState<AppSettings>(appSettingsSchema, {}),
)as AppSettings))


export const initStore = () => {

    appSettings.pipe(
        skip(1),
    ).subscribe(
        value => {
            BrowserWindow.getFocusedWindow()?.webContents.send(IpcChannel.GetAppSettings, value)
            electronStore.set(Configs[Configs.AppSettings], value)
        },
    )
}