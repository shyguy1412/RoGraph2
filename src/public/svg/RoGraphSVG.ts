import { GeckoSVG } from "geckosvg";

export abstract class RoGraphSVG extends GeckoSVG {

  labelWidth!: number;
  labelHeight!: number;


  init() {
    this.style.userSelect = 'none';
    this.style.display = 'inline-block';
    this.root.style.overflow = 'visible';
    this.draw();
  }

  abstract draw(): void;
  abstract updateShape(): void;

}