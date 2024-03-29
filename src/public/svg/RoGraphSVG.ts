import { RoGraphBlock } from "@rograph/blocks/RoGraphBlock";
import { GeckoSVG } from "geckosvg";

export abstract class RoGraphSVG extends GeckoSVG {

  init() {
    this.style.userSelect = 'none';
    this.style.display = 'inline-block';
    this.root.style.overflow = 'visible';
    this.width = 0;
    this.height = 0;
    this.draw();
  }

  abstract draw(): void;
  abstract updateShape(block: RoGraphBlock): void;

}