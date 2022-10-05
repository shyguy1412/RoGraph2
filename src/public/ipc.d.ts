declare namespace i18n {
    function t(key: string, ns?:string, lng?:string): string;
    const languages: string[];
    function currentLanguage():string;
    function setLanguage(lang:string):void;
}

declare namespace IPC {

    type ipcEvent = 'open-settings' | 'set-language'

    function onMessage(channel: ipcEvent, listener: (event: import('electron').IpcRendererEvent, ...args: any[]) => void): void;
    function reloadApp():void;
    function changeLanguage(lang:string):void;
}