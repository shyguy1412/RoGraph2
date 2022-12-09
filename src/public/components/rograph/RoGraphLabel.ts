import { RoGraphElement } from "./RoGraphElement";

export class RoGraphLabel extends RoGraphElement {
    init(): void {
        const labelCode = this.getAttribute('rg-label-code') ?? '';
        this.innerHTML = /*html*/`
            <span>${labelCode}</span>
        `
    }
}
