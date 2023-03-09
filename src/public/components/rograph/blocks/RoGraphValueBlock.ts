import { RoGraphSVG } from "@svg/RoGraphSVG";
import { ValueBlockSVG } from "@svg/ValueBlockSVG";
import { RoGraphBlock } from "./RoGraphBlock";

export class RoGraphValueBlock extends RoGraphBlock {
  returnType!: string;

  init(): void {
    this.returnType = 'test';
  }

  defineSVG(): RoGraphSVG {
    return ValueBlockSVG.create();
  }

  updateShape(): void {
    this.svg.updateShape();
  }

}