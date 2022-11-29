import { registerComponent } from '@rograph/RoGraphElement';
import { RoGraphSlot } from '@rograph/RoGraphSlot';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { GeckoSVG } from 'geckosvg';
import { RoGraphBlock} from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {
    
    init(): void {
        
    }

    updateShape(): void {
    }

    defineSlots(): RoGraphSlot[] {
        return [
        ]
    }

    defineSVG(): GeckoSVG {
        return StackBlockSVG.create();
    }

}
