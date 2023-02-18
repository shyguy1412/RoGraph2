import { RoGraphScope } from "./RoGraphScope";

export class RoGraphValueSlot extends RoGraphScope {

    init(): void {
        this.setAttribute('part', 'valueslot');
        console.log('VALUE');
    }

}
