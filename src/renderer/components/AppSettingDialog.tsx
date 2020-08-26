
import React, { useState, useEffect } from 'react'
// import { SettingForm } from './SetteingForm'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'
import { appSettingsSchema, AppSettings } from "@src/common/models"
import { IpcChannel } from "@src/common/enums"
import { MuiForm} from '@rjsf/material-ui'
import { ISubmitEvent } from '@rjsf/core'

const AppSettingDialog: React.FC = () => {

    const [open, setOpen] = useState(false)
    const [appSettings, setAppSettings] = useState<AppSettings | undefined>(undefined)

    useEffect(
        () => {window.electron.on(IpcChannel.OpenAppSettingDialog, () => setOpen(true))}, [],
    )

    useEffect(
        () => {
            const listener = (event: Electron.IpcRendererEvent, args: AppSettings) => {
                setAppSettings(args)
            }
            window.electron.on<AppSettings>(IpcChannel.GetAppSettings, listener)
            return(() => {window.electron.removeListener(IpcChannel.GetAppSettings, listener)})
        },
        [],
    )

    useEffect(
        () => {
            window.electron.send<undefined>(IpcChannel.GetAppSettings, undefined)
        },
        [],
    )

    const handleSubmit = (event: ISubmitEvent<AppSettings>) => {
        window.electron.send(IpcChannel.SetAppSettings, event.formData)
    }
    
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <MuiForm
                    schema={appSettingsSchema}
                    formData={appSettings}
                    // onChange={(data: IChangeEvent<unknown>) => {
                    //     console.log(data.formData);
                    // }}
                    onSubmit={handleSubmit}
                >
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </MuiForm>
            </DialogContent>
            {/* <p>aaaa</p> */}
        </Dialog>
    )
}

export {AppSettingDialog }