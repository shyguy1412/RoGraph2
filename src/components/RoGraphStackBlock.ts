import { StackBlockSVG } from '../svg/StackBlockSVG';
import { registerComponent, RoGraphElement } from './RoGraphElement';

export class RoGraphStackBlock extends RoGraphElement{

    init(): void {
        this.append(StackBlockSVG.create());
    }
}

registerComponent(RoGraphStackBlock);