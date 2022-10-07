
declare namespace i18n {
    function t(key: string, ns?:string, lng?:string): string;
    const languages: string[];
    function currentLanguage():string;
    function setLanguage(lang:string):void;
}

declare namespace IPC {

    function onMessage(channel: string, listener: (event: import('electron').IpcRendererEvent, ...args: any[]) => void): void;
    function onMessage(channel: 'open-settings', listener: (event: import('electron').IpcRendererEvent) => void): void;
    function onMessage(channel: 'set-language', listener: (event: import('electron').IpcRendererEvent, lang:string) => void): void;
    function onMessage(channel: 'load-extension', listener: (event: import('electron').IpcRendererEvent, extension:import('../shared/Extension').Extension) => void): void;

    function reloadApp():void;
    function changeLanguage(lang:string):void;
}