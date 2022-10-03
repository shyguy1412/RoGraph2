import { contextBridge } from "electron";
import i18n from "./i18next.config";

contextBridge.exposeInMainWorld('i18n', {
    t: (key:string) => i18n.t(key)
})