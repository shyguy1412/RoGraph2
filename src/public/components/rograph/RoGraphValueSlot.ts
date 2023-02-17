import { RoGraphSlot } from "./RoGraphSlot";

export class RoGraphValueSlot extends RoGraphSlot {

    init(): void {
        this.setAttribute('part', 'valueslot');
        console.log('VALUE');
    }

    updateClientPosition() {
    }

}
