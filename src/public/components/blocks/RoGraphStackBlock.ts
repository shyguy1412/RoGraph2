import { registerComponent } from '@components/RoGraphElement';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { GeckoSVG } from 'geckosvg';
import { RoGraphBlock, RoGraphBlockPlug, RoGraphBlockSocket } from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {

    definePlugs(): RoGraphBlockPlug[] {
        return [

        ]
    }

    defineSocket(): RoGraphBlockSocket {
        return new RoGraphBlockSocket(this, {
            x: 0,
            y: 0
        });
    }

    defineSVG(): GeckoSVG {
        return StackBlockSVG.create();
    }

    init(): void {
    }

}

registerComponent(RoGraphStackBlock);