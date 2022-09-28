import { registerComponent } from "@components/RoGraphElement";
import { RoGraphSlot } from "@components/RoGraphSlot";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {

    declare svg: WrapBlockSVG;

    defineSlots(): RoGraphSlot[] {
        return [
            RoGraphSlot.create<RoGraphSlot>()
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

}

registerComponent(RoGraphWrapBlock);