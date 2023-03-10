import { RoGraphBlock } from "@rograph/blocks/RoGraphBlock";
import { registerComponent } from "geckosvg";
import { GeckoSVGPolygonElement } from "geckosvg/dist/elements/renderable/shape/GeckoSVGPolygonElement";
import { RoGraphSVG } from "./RoGraphSVG";

export class ValueBlockSVG extends RoGraphSVG {
  static readonly fill = '#b855d1';
  static readonly stroke = '#663073';
  static readonly plugWidth = 18;
  static readonly plugHeight = 5;
  static readonly plugPos = 15;
  static readonly strokeWidth = 3
  shape!: GeckoSVGPolygonElement;

  labelWidth!: number;
  labelHeight!: number;

  updateShape(block: RoGraphBlock) {

    const labelBounds = block.label.getBoundingClientRect();

    this.width = 20 + Math.round(labelBounds.width);
    this.height = 20 + Math.round(labelBounds.height);

    const shape = [
      [0, 0],

      [this.width, 0],
      [this.width, this.height],

      [0, this.height],
    ]

    this.shape.points(shape.map((value) => ({ x: value[0], y: value[1] })))
  }

  draw() {
    this.labelHeight = 0;
    this.labelWidth = 0;
    this.shape = this.polygon([{ x: 0, y: 0 }])
      .fill(ValueBlockSVG.fill)
      .stroke(ValueBlockSVG.stroke)
      .strokeWidth(ValueBlockSVG.strokeWidth);;
  }
}

registerComponent(ValueBlockSVG);