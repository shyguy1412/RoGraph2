import { RoGraphContentSlot } from "@rograph/RoGraphContentSlot";
import { RoGraphScope } from "@rograph/RoGraphScope";
import { RoGraphSlot } from "@rograph/RoGraphSlot";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {
   declare svg: WrapBlockSVG;

    getContent():RoGraphScope[]{
        const content:RoGraphScope[] = [];

        this.shadowRoot!.querySelectorAll<RoGraphScope>('rg-contentslot').forEach(slot => {
            content.push(slot);
        });

        return content;
    }

    insertContent(slotIndex:number, blocks:RoGraphBlock[]){
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
        // this.svg.contentHeight = this.slots[0].getBoundingClientRect().height;
        // this.svg.updateShape();
    }
}
