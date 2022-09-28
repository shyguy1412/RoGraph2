import { registerComponent } from '@components/RoGraphElement';
import { RoGraphSlot } from '@components/RoGraphSlot';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { GeckoSVG } from 'geckosvg';
import { RoGraphBlock} from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {
    
    slotUpdate(slot: RoGraphSlot): void {
    }

    defineSlots(): RoGraphSlot[] {
        return [
        ]
    }

    defineSVG(): GeckoSVG {
        return StackBlockSVG.create();
    }

}

registerComponent(RoGraphStackBlock);