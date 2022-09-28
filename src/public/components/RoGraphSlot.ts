import { registerComponent, RoGraphElement } from "./RoGraphElement";
import { RoGraphStack } from "./RoGraphStack";

export class RoGraphSlot extends RoGraphElement {

    pos: { x: number, y: number } | null = null;
    parent: RoGraphElement | null = null;

    connectStack(stack: RoGraphStack): void {
        const blocks = [...stack.children].reverse();
        this.prepend(...blocks);
    }

    for(parent: typeof this.parent) {
        this.parent = parent;
        return this;
    }

    at(pos: typeof this.pos) {
        this.pos = pos;
        this.updateClientPosition();
        return this;
    }

    private updateClientPosition() {
        this.style.left = (this.pos?.x || 0) + 'px';
        this.style.top = (this.pos?.y || 0) + 'px';
    }

    init(): void {
    }

}

registerComponent(RoGraphSlot);