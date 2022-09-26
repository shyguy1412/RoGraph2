import { dist } from '../../assets/functions';
import { WrapBlockSVG } from '../../svg/WrapBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';
import { registerComponent, RoGraphElement } from '../RoGraphElement';
import { RoGraphStack } from '../RoGraphStack';
import { RoGraphStackBlock } from './RoGraphStackBlock';

export class RoGraphWrapBlock extends RoGraphBlock {
    svg!: WrapBlockSVG;

    get content() {
        return this.querySelector('div')!;
    }

    init(): void {

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

}


registerComponent(RoGraphWrapBlock);
// registerComponent(RoGraphWrapBlockContent);