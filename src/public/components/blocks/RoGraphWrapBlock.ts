import { RoGraphContentSlot } from "@components/RoGraphContentSlot";
import { registerComponent, RoGraphElement } from "@components/RoGraphElement";
import { RoGraphSlot } from "@components/RoGraphSlot";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {
   declare svg: WrapBlockSVG;

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
        this.svg.contentHeight = this.slots[0].getBoundingClientRect().height;
        this.svg.updateShape();
    }
}

registerComponent(RoGraphWrapBlock);