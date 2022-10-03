import { RoGraphElement } from "./RoGraphElement";
import { RoGraphScope } from "./RoGraphScope";

export abstract class RoGraphSlot extends RoGraphScope {

    pos: { x: number, y: number } | null = null;
    parent: RoGraphElement | null = null;

    // connectScope(stack: RoGraphStack): void {
    //     const blocks = [...stack.children].reverse();
    //     this.prepend(...blocks);
    //     console.log('TRUE');

    // }

    for(parent: typeof this.parent) {
        this.parent = parent;
        return this;
    }

    at(pos: typeof this.pos) {
        this.pos = pos;
        this.updateClientPosition();
        return this;

    }

    init(): void {
        super.init();
        this.classList.add('rg-slot');
    }
    
    abstract updateClientPosition():void;

}