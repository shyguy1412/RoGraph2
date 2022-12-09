import { registerComponent, RoGraphElement } from '@rograph/RoGraphElement';
import { RoGraphLabel } from '@rograph/RoGraphLabel';
import { RoGraphSlot } from '@rograph/RoGraphSlot';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { GeckoSVG } from 'geckosvg';
import { RoGraphBlock} from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {
    declare svg: StackBlockSVG;
    
    init(): void {
        const label = RoGraphElement.create(RoGraphLabel);
        label.setAttribute('rg-label-code', '@number1 + @number2');
        this.shadowRoot!.append(label);

        const resizeObserver = new ResizeObserver(() => {
            this.updateShape(label);
        })
        resizeObserver.observe(label);
    }

    updateShape(label:RoGraphLabel|void): void {
        if(!label)return;

        const bounds = label.getBoundingClientRect();
        this.svg.labelWidth = Math.round(bounds.width);
        this.svg.labelHeight = Math.round(bounds.height);
        console.log(bounds.width);
        console.log(bounds.height);
        
        this.svg.updateShape();
    }

    defineSVG(): GeckoSVG {
        return StackBlockSVG.create();
    }

}
