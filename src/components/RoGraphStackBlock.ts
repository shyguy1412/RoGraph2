import { GeckoSVG } from 'geckosvg';
import { StackBlockSVG } from '../svg/StackBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphStack } from './RoGraphStack';

export class RoGraphStackBlock extends RoGraphElement implements RoGraphBlock{
    
    canConnectStack(stack: RoGraphStack): boolean {
        throw new Error('Method not implemented.');
    }
    
    connectStack(stack: RoGraphStack): void {
        throw new Error('Method not implemented.');
    }
    
    init(): void {
        const block = StackBlockSVG.create();
        this.append(block);
    }
}

registerComponent(RoGraphStackBlock);