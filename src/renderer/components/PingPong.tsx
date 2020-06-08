import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { IpcChannel } from "@src/common/constants";
import { pingMessage } from "@src/renderer/store";
import React from "react";

function handleClick() {
  window.electron
    .invoke<string>(IpcChannel.FirePing, "Ping from renderer")
    .then((value) => {
      pingMessage.next(value as string);
    });
}
function PingPong() {
  const [message, setMessage] = React.useState<string>("aaa");
  const [open, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    pingMessage.subscribe((value: string) => {
      setMessage(value);
      setOpen(true);
    });
  });
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Ping
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {"You've got message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { PingPong };
