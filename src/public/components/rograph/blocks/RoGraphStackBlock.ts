import { RoGraphElement } from '@rograph/RoGraphElement';
import { RoGraphLabel } from '@rograph/RoGraphLabel';
import { RoGraphSVG } from '@svg/RoGraphSVG';
import { StackBlockSVG } from '@svg/StackBlockSVG';
import { RoGraphBlock } from './RoGraphBlock';

export class RoGraphStackBlock extends RoGraphBlock {
  declare svg: StackBlockSVG;

  init(): void {
    this.label.setAttribute('label-code', '(\\@boolean) then @test abbabab');
  }

  // updateShape(label: RoGraphLabel | void): void {
  //   if (!label) return;
  //   // console.log(label);

  //   this.svg.updateShape();
  // }

  defineSVG(): RoGraphSVG {
    return StackBlockSVG.create();
  }

}
