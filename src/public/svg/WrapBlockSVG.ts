import { GeckoSVG, registerComponent } from "geckosvg";
import { GeckoSVGPolygonElement } from "geckosvg/dist/elements/renderable/shape/GeckoSVGPolygonElement";
import { RoGraphStack } from "../components/RoGraphStack";

const fill = '#e6b400';
const stroke = '#be8200';
const plugWidth = 18;
const plugHeight = 5;
const plugPos = 15;
const strokeWidth = 3
const stem = 20;
const upperHeight = 35;
const middleHeight = 20;
const lowerHeight = 20;
const width = 150;

let num = 0;

export class WrapBlockSVG extends GeckoSVG {
    shape!: GeckoSVGPolygonElement;
    contentHeight!: number;
    updateShape() {
        this.width = width;
        this.height = upperHeight + middleHeight + lowerHeight + this.contentHeight;
        const shape = [
            [0, 0],

            //plug
            [plugPos, 0],
            [plugPos, +plugHeight],
            [plugPos + plugWidth, +plugHeight],
            [plugPos + plugWidth, 0],

            [width, 0],
            [width, upperHeight],

            //inner socket
            [stem + plugPos + plugWidth, upperHeight],
            [stem + plugPos + plugWidth, upperHeight + plugHeight],
            [stem + plugPos, upperHeight + plugHeight],
            [stem + plugPos, upperHeight],

            [stem, upperHeight],
            [stem, upperHeight + middleHeight],
            [width, upperHeight + middleHeight],
            [width, this.height],


            //socket
            [plugPos + plugWidth, this.height],
            [plugPos + plugWidth, this.height + plugHeight],
            [plugPos, this.height + plugHeight],
            [plugPos, this.height],

            [0, this.height],
        ]


        this.shape.points(shape.map((value) => ({ x: value[0], y: value[1] })))

    }

    init() {
        num++;

        this.shape = this.polygon([{ x: 0, y: 0 }])
            .fill(fill)
            .stroke(stroke)
            .strokeWidth(strokeWidth);;
        this.text(num + '', 10, 25);
        this.contentHeight = 0;
        this.updateShape();
    }
}

registerComponent(WrapBlockSVG);