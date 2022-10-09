import { Menu } from "./Menu";

export class ExtensionMenu extends Menu{
    
    html(): string {
        return /* */`
        EXTENSION MENU
        `
    }

    applyListeners(): void {
        this.attach(document.querySelector('#extension-icon')!)
    }


}