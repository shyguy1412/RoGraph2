import { Menu } from "./Menu";

export class LibraryMenu extends Menu {

    html(): string {
        return /* */`
        LIBRARY MENU
        `
    }

    applyListeners(): void {
        this.attach(document.querySelector('#library-icon')!)
    }

}