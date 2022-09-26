import { registerComponent } from '@components/RoGraphElement';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { GeckoSVG } from 'geckosvg';
import { RoGraphBlock, RoGraphBlockConnector} from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {

    defineConnectors(): RoGraphBlockConnector[] {
        const self = this;
        const pos = {
            x: 0,
            get y(){
                return self.getBoundingClientRect().height
            },
        };
        
        return [
            new RoGraphBlockConnector(this, pos)
        ]
    }

    defineSVG(): GeckoSVG {
        return StackBlockSVG.create();
    }

}

registerComponent(RoGraphStackBlock);