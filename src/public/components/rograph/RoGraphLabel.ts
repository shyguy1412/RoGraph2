import { RoGraphElement } from "./RoGraphElement";

export class RoGraphLabel extends RoGraphElement {
    init(): void {
        this.setAttribute('part', 'label');
        this.innerHTML = this.parseLabel();
    }

    parseLabel() {
        const labelCode = this.getAttribute('rg-label-code') ?? '';
        const parsedLabel = labelCode.replace(/@([a-zA-Z0-9]*)/g, '<rg-valueslot type="$1"></rg-valueslot>');
        return parsedLabel;
    }
}
