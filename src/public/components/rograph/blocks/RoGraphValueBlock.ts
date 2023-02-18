import { ValueBlockSVG } from "@svg/ValueBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock } from "./RoGraphBlock";

export class RoGraphValueBlock extends RoGraphBlock{
    init(): void {
        throw new Error("Method not implemented.");
    }
    defineSVG(): GeckoSVG {
        return ValueBlockSVG.create();
    }
    updateShape(): void {
        throw new Error("Method not implemented.");
    }
    
}