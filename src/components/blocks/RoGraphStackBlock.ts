import { GeckoSVG } from 'geckosvg';
import { StackBlockSVG } from '../../svg/StackBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from '../RoGraphElement';
import { RoGraphStack } from '../RoGraphStack';
import { dist } from '../../assets/functions';

export class RoGraphStackBlock extends RoGraphElement implements RoGraphBlock {


    init(): void {
        this.classList.add('rg-block');
        const svg = StackBlockSVG.create();
        this.append(svg);
    }


    tryConnectTop(stack: RoGraphStack): boolean {
        let result = false;
        const bounds = this.getBoundingClientRect();
        const stackBounds = stack.getBoundingClientRect();

        if (dist(bounds.left, bounds.top, stackBounds.left, stackBounds.bottom) < RoGraphStack.connectionThreshold) {
            const children = [...stack.querySelectorAll<RoGraphBlock>('rg-stack>*')];

            children.forEach(child => {
                this.before(child);
            });

            //offset parent stack
            let parentStack: RoGraphStack | null = null;
            let iterator = this as HTMLElement;
            while (iterator.parentElement && !parentStack) {
                iterator = iterator.parentElement;
                if (iterator instanceof RoGraphStack) {
                    parentStack = iterator;
                }
            }
            const offset = this.getBoundingClientRect().bottom - bounds.bottom;
            parentStack!.y -= offset;
            result = true;
        }

        return result;
    }

    tryConnectBottom(stack: RoGraphStack): boolean {
        let result = false;
        const bounds = this.getBoundingClientRect();
        const stackBounds = stack.getBoundingClientRect();

        if (dist(bounds.left, bounds.bottom, stackBounds.left, stackBounds.top) < RoGraphStack.connectionThreshold) {
            const children = [...stack.querySelectorAll<RoGraphBlock>('rg-stack>*')];

            children.reverse();
            children.forEach(child => {
                this.after(child);
            });
            result = true;
        }

        return result;
    }

    tryConnectStack(stack: RoGraphStack): void {
        const connectToTop = this.tryConnectTop(stack);
        const connectToBottom = this.tryConnectBottom(stack);

        if (!(connectToTop || connectToBottom)) return;
        console.log(connectToTop, connectToBottom);
        
        if (connectToTop == connectToBottom) {
            throw new Error('tried to connect to multiple sockets');
        }
    }

}

registerComponent(RoGraphStackBlock);