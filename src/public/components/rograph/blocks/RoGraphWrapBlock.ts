import { RoGraphContentSlot } from "@rograph/RoGraphContentSlot";
import { RoGraphScope } from "@rograph/RoGraphScope";
import { RoGraphSlot } from "@rograph/RoGraphSlot";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {
    declare svg: WrapBlockSVG;

    init(): void {
        const slots = this.defineSlots();
        this.shadowRoot!.append(...slots);
        slots.forEach((slot, index) => {
            const slotEl = document.createElement('slot');
            slotEl.setAttribute('name', 'content' + index);
            slotEl.addEventListener('slotchange', () => this.updateShape());
            slot.append(slotEl);
        })

    }

    getContent(): RoGraphScope[] {
        const content: RoGraphScope[] = [];

        this.shadowRoot!.querySelectorAll<RoGraphScope>('rg-contentslot').forEach(slot => {
            content.push(slot);
        });

        return content;
    }

    insertToSlot(slot: string, blocks: RoGraphBlock[]) {
        blocks.forEach(block => block.setAttribute('slot', slot));
        this.append(...blocks);
    }

    defineSlots(): RoGraphSlot[] {
        const slot = RoGraphContentSlot.create<RoGraphContentSlot>();

        slot.pos.x = WrapBlockSVG.upperHeight;
        slot.pos.y = WrapBlockSVG.stem;

        return [
            slot
        ]
    }

    defineSVG(): GeckoSVG {
        return WrapBlockSVG.create();
    }

    updateShape(): void {
        const height = [...this.querySelectorAll<RoGraphBlock>(':scope > *')]
            .filter(el => el instanceof RoGraphBlock)
            .reduce((value, block) => value += block.getBoundingClientRect().height, 0);

        this.svg.contentHeight = height;
        this.svg.updateShape();
    }
}
