import { RoGraphContentSlot } from "@rograph/RoGraphContentSlot";
import { RoGraphScope } from "@rograph/RoGraphScope";
import { RoGraphSlot } from "@rograph/RoGraphSlot";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {
    declare svg: WrapBlockSVG;
    
    init(): void {
    }
 
    getContent(): RoGraphScope[] {
        const content: RoGraphScope[] = [];
        
        this.shadowRoot!.querySelectorAll<RoGraphScope>('rg-contentslot').forEach(slot => {
            content.push(slot);
        });
        
        return content;
    }
    
    insertContent(slotIndex: number, blocks: RoGraphBlock[]) {
        blocks.forEach(block => block.setAttribute('slot', 'slot' + slotIndex));
        this.append(...blocks);
    }

    defineSlots(): RoGraphSlot[] {
        return [
            RoGraphContentSlot.create<RoGraphContentSlot>()
                .for(this)
                .at({
                    x: WrapBlockSVG.stem,
                    y: WrapBlockSVG.upperHeight
                })
        ]
    }

    defineSVG(): GeckoSVG {
        return WrapBlockSVG.create();
    }

    slotUpdate(slot: RoGraphSlot): void {
        const height = [...this.querySelectorAll<RoGraphBlock>(':scope > *')]
        .filter(el => el instanceof RoGraphBlock)
        .reduce((value, block) => value += block.getBoundingClientRect().height, 0);

        this.svg.contentHeight = height;
        this.svg.updateShape();
    }
}
