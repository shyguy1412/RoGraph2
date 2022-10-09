import { CustomElement } from "./CustomElement";
import "./MenuBar";

export class RoGraphMenu extends CustomElement {

    html(): string {
        return `
            <menu-bar></menu-bar>
            <block-menu></block-menu>
            <library-menu></library-menu>
            <extension-menu></extension-menu>
            <sketchbook-menu></sketchbook-menu>
        `
    }

    applyListeners(): void {
    }

}