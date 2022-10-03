declare namespace i18n {
    function t(key: string): string;
}

declare namespace ipcEvents {
    function on(channel: string, listener: (event: import('electron').IpcRendererEvent, ...args: any[]) => void): void;
}