import { Button, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import { IpcChannel } from '@src/common/constants'
import { pingMessage } from '@src/renderer/store'
import React from 'react'

const handleClick = () => {
    window.electron.invoke<string>(IpcChannel.FirePing, 'Ping from renderer').then((value) => {
        pingMessage.next(value as string)
    })
}

const PingPong: React.FC = () => {
    const [message, setMessage] = React.useState<string>('aaa')
    const [open, setOpen] = React.useState<boolean>(false)
    React.useEffect(() => {
        const subscription = pingMessage.subscribe((value: string) => {
            setMessage(value)
            setOpen(true)
        })
        return () => subscription.unsubscribe()
    })
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClick}>
                Ping
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle id="alert-dialog-title">{"You've got message"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export { PingPong }
