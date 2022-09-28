import { registerComponent, RoGraphElement } from "./RoGraphElement";
import { RoGraphStack } from "./RoGraphStack";

export class RoGraphSlot extends RoGraphElement {

    connectStack(stack: RoGraphStack): void {
        const blocks = [...stack.children].reverse();
        this.prepend(...blocks);
    }

    set pos(pos: { x: number, y: number }) {
        const { x, y } = pos;
        this.style.setProperty('xPos', '' + x);
        this.style.setProperty('yPos', '' + y);
    }

    get pos() {
        const x = Number.parseInt(this.style.getPropertyValue('xpos'));
        const y = Number.parseInt(this.style.getPropertyValue('ypos'));
        return { x, y }
    }

    init(): void {
    }

}

registerComponent(RoGraphSlot);