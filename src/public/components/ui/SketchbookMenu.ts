import { Menu } from "./Menu";

export class SketchbookMenu extends Menu {

    html(): string {
        return /* */`
        SKETCHBOOK MENU
        `
    }

    applyListeners(): void {
        this.attach(document.querySelector('#sketchbook-icon')!)
    }


}