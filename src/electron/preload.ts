import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import i18n from "./i18next.config";

contextBridge.exposeInMainWorld('i18n', {
    t: (key: string) => i18n.t(key)
})

contextBridge.exposeInMainWorld('ipcEvents', {
    on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
})