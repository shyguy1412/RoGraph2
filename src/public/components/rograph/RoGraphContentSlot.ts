import { registerComponent } from "./RoGraphElement";
import { RoGraphSlot } from "./RoGraphSlot";

export class RoGraphContentSlot extends RoGraphSlot {
    updateClientPosition() {
        this.style.left = (this.pos?.x || 0) + 'px';
        this.style.top = (this.pos?.y || 0) + 'px';
    }

    connectedCallback(): void {
        this.style.position = 'absolute';    
    }
}
