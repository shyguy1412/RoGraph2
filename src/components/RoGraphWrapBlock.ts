import { WrapBlockSVG } from '../svg/WrapBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphStack } from './RoGraphStack';
import { RoGraphStackBlock } from './RoGraphStackBlock';

export class RoGraphWrapBlock extends RoGraphElement implements RoGraphBlock{
    svg!: WrapBlockSVG;

    get content(){
        return this.querySelector('rg-wrapblockcontent')! as RoGraphWrapBlockContent;
    }

    init(): void {
        this.svg = WrapBlockSVG.create();
        this.appendChild(this.svg);
        this.appendChild(RoGraphWrapBlockContent.create());
        
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
        
        this.content.appendChild(RoGraphStackBlock.create());
    }

    canConnectStack(stack: RoGraphStack): boolean {
        throw new Error('Method not implemented.');
    }
    connectStack(stack: RoGraphStack): void {
        throw new Error('Method not implemented.');
    } 
    
}

class RoGraphWrapBlockContent extends RoGraphElement{

}

registerComponent(RoGraphWrapBlock);
registerComponent(RoGraphWrapBlockContent);