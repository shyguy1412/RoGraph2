import { GeckoSVG } from 'geckosvg';
import { StackBlockSVG } from '../svg/StackBlockSVG';
import { registerComponent, RoGraphElement } from './RoGraphElement';

export class RoGraphStackBlock extends RoGraphElement{

    init(): void {
        const block = StackBlockSVG.create();
        this.append(block);
    }
}

registerComponent(RoGraphStackBlock);