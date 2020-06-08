import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { IpcChannel } from '@src/common/constants';

function onGetAccounts() {
  return [
    {
      id: 'test1',
    },
    {
      id: 'test2',
    },
    {
      id: 'test3',
    },
    {
      id: 'test4',
    },
  ];
}

function onFirePing(event: IpcMainInvokeEvent, arg: unknown) {
  return 'Pong from main';
}
export function registerIpcHandlers() {
  ipcMain.handle(IpcChannel.GetAccounts, onGetAccounts);
  ipcMain.handle(IpcChannel.FirePing, onFirePing);
}
