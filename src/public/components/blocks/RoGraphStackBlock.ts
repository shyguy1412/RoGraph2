import { GeckoSVG } from 'geckosvg';
import { StackBlockSVG } from '../../svg/StackBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from '../RoGraphElement';
import { RoGraphStack } from '../RoGraphStack';
import { dist } from '../../assets/functions';

export class RoGraphStackBlock extends RoGraphBlock {


    init(): void {
        const svg = StackBlockSVG.create();
        this.append(svg);
    }

}

registerComponent(RoGraphStackBlock);