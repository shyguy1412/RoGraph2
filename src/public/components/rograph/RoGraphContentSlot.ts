import { RoGraphSlot } from "./RoGraphSlot";

export class RoGraphContentSlot extends RoGraphSlot {

    init(){};

    updateClientPosition() {
        console.log(this.pos);
        
        this.style.left = (this.pos.x || 0) + 'px';
        this.style.top = (this.pos.y || 0) + 'px';
    }

    connectedCallback(): void {
        this.style.position = 'absolute';    
    }
}
