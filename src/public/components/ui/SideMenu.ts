import { CustomElement } from "./CustomElement";
import { Menu } from "./Menu";
import "./TabBar";

export class SideMenu extends CustomElement {

    html(): string {
        return `
            <div class="menu">
                <tab-bar></tab-bar>
                <block-menu></block-menu>
                <sketchbook-menu></sketchbook-menu>
                <extension-menu></extension-menu>
            </div>
        `
    }

    applyListeners(): void {
        const menuButtons = [...this.shadowRoot!.querySelector('tab-bar')!
            .shadowRoot!.querySelectorAll<HTMLElement>('.menu-icon')!]

        this.shadowRoot!.querySelector<Menu>('block-menu')!.attach(menuButtons[0]);
        this.shadowRoot!.querySelector<Menu>('sketchbook-menu')!.attach(menuButtons[1]);
        this.shadowRoot!.querySelector<Menu>('extension-menu')!.attach(menuButtons[2]);
    }

}