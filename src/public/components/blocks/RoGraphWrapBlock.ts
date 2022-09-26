import { registerComponent } from "@components/RoGraphElement";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock, RoGraphBlockPlug, RoGraphBlockSocket } from "./RoGraphBlock";

export class RoGraphWrapBlock extends RoGraphBlock {

    definePlugs(): RoGraphBlockPlug[] {
        throw new Error('Method not implemented.');
    }
    defineSocket(): RoGraphBlockSocket[] {
        throw new Error('Method not implemented.');
    }
    defineSVG(): GeckoSVG {
        throw new Error('Method not implemented.');
    }
    init(): void {
        throw new Error('Method not implemented.');
    }

}


registerComponent(RoGraphWrapBlock);
// registerComponent(RoGraphWrapBlockContent);