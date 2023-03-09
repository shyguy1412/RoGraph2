import { RoGraphContentSlot } from "@rograph/RoGraphContentSlot";
import { RoGraphScope } from "@rograph/RoGraphScope";
import { RoGraphSVG } from "@svg/RoGraphSVG";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {
  declare svg: WrapBlockSVG;

  init(): void {
    const slots = this.defineContentSlots();
    this.shadowRoot!.append(...slots);
    slots.forEach((slot, index) => {
      slot.setAttribute('name', 'content' + index);
    })

    this.label.setAttribute('label-code', 'if @boolean then');
  }

  getContent(): RoGraphScope[] {
    const content: RoGraphScope[] = [];

    this.shadowRoot!.querySelectorAll<RoGraphScope>('rg-contentslot').forEach(slot => {
      content.push(slot);
    });

    return content;
  }

  defineContentSlots(): RoGraphContentSlot[] {
    const slot = RoGraphContentSlot.create<RoGraphContentSlot>();
    
    slot.pos.x = WrapBlockSVG.stem;
    slot.pos.y = WrapBlockSVG.upperHeight;

    return [
      slot
    ]
  }

  defineSVG(): RoGraphSVG {
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
