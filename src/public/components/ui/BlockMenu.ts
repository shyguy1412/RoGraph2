import { Menu } from "./Menu";

export class BlockMenu extends Menu{
    
    html(): string {
        return /* */`
        BLOCK MENU
        `
    }

    applyListeners(): void {
        this.attach(document.querySelector('#block-icon')!)
    }

}