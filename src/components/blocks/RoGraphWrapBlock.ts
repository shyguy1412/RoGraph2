import { dist } from '../../assets/functions';
import { WrapBlockSVG } from '../../svg/WrapBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from '../RoGraphElement';
import { RoGraphStack } from '../RoGraphStack';
import { RoGraphStackBlock } from './RoGraphStackBlock';

export class RoGraphWrapBlock extends RoGraphElement implements RoGraphBlock {
    svg!: WrapBlockSVG;

    get content() {
        return this.querySelector('div')!;
    }

    init(): void {
        this.classList.add('rg-block');

        this.svg = WrapBlockSVG.create();
        this.appendChild(this.svg);

        this.appendChild(document.createElement('div'));
        this.content.classList.add('wrap-content');
        
        const observer = new MutationObserver((mutations) => {
            console.log([...this.content.children].reduce((previous, next) => {
                console.log(next);
                
                return previous += next.getBoundingClientRect().width;
            }, 0));
            
            const bounds = this.content.getBoundingClientRect();
            this.svg.contentHeight = bounds.height;
            this.svg.updateShape();
        });
        
        observer.observe(this.content, {childList: true})
    }

    tryConnectTop(stack: RoGraphStack): boolean {
        let result = false;
        const bounds = this.getBoundingClientRect();
        const stackBounds = stack.getBoundingClientRect();
        // if(this.previousElementSibling) return;
        if (dist(bounds.left, bounds.top, stackBounds.left, stackBounds.bottom) < RoGraphStack.connectionThreshold) {
            const children = [...stack.querySelectorAll<RoGraphBlock>('rg-stack>*')];

            children.forEach(child => {
                this.before(child);
            });

            //offset parent stack
            const parentStack = this.parentElement!;
            if(parentStack instanceof RoGraphStack){
                const offset = this.getBoundingClientRect().bottom - bounds.bottom;
                parentStack!.y -= offset;
                console.log('offset');
                
            }
            // let parentStack: RoGraphStack | null = null;
            // let iterator = this as HTMLElement;
            // while (iterator.parentElement && !parentStack) {
            //     iterator = iterator.parentElement;
            //     if (iterator instanceof RoGraphStack) {
            //         parentStack = iterator;
            //     }
            // }
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

    tryConnectContent(stack: RoGraphStack): boolean {
        let result = false;
        const bounds = this.content.getBoundingClientRect();
        const stackBounds = stack.getBoundingClientRect();
        const canConnect = dist(bounds.left, bounds.top, stackBounds.left, stackBounds.top) < RoGraphStack.connectionThreshold;
        if (!this.content.childElementCount && canConnect) {
            const children = [...stack.querySelectorAll<RoGraphBlock>('rg-stack>*')];

            children.forEach(child => {
                this.content.appendChild(child);
            });
            result = true;
        }

        return result;
    }


    tryConnectStack(stack: RoGraphStack): void {
        const connectToTop = this.tryConnectTop(stack);
        const connectToBottom = this.tryConnectBottom(stack);
        const connectToContent = this.tryConnectContent(stack);

        if (!(connectToTop || connectToBottom || connectToContent)) return;
        if (!((connectToTop !== connectToBottom) !== connectToContent)) {
            console.log(connectToTop, connectToBottom, connectToContent);

            throw new Error('tried to connect to multiple sockets');
        }
    }

}


registerComponent(RoGraphWrapBlock);
// registerComponent(RoGraphWrapBlockContent);