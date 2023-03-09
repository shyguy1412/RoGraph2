import { registerComponent } from "geckosvg";
import { GeckoSVGPolygonElement } from "geckosvg/dist/elements/renderable/shape/GeckoSVGPolygonElement";
import { RoGraphSVG } from "./RoGraphSVG";


let num = 0;

export class WrapBlockSVG extends RoGraphSVG {

    static readonly fill = '#e6b400';
    static readonly stroke = '#be8200';
    static readonly plugWidth = 18;
    static readonly plugHeight = 5;
    static readonly plugPos = 15;
    static readonly strokeWidth = 3
    static readonly stem = 20;
    static readonly upperHeight = 35;
    static readonly lowerHeight = 20;
    static readonly width = 150;



    shape!: GeckoSVGPolygonElement;
    contentHeight!: number;
    updateShape() {
        let middleHeight = this.contentHeight || 20;

        this.width = WrapBlockSVG.width;
        this.height = WrapBlockSVG.upperHeight + middleHeight + WrapBlockSVG.lowerHeight;
        const shape = [
            [0, 0],

            //plug
            [WrapBlockSVG.plugPos, 0],
            [WrapBlockSVG.plugPos, WrapBlockSVG.plugHeight],
            [WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, WrapBlockSVG.plugHeight],
            [WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, 0],

            [WrapBlockSVG.width, 0],
            [WrapBlockSVG.width, WrapBlockSVG.upperHeight],

            //inner socket
            [WrapBlockSVG.stem + WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, WrapBlockSVG.upperHeight],
            [WrapBlockSVG.stem + WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, WrapBlockSVG.upperHeight + WrapBlockSVG.plugHeight],
            [WrapBlockSVG.stem + WrapBlockSVG.plugPos, WrapBlockSVG.upperHeight + WrapBlockSVG.plugHeight],
            [WrapBlockSVG.stem + WrapBlockSVG.plugPos, WrapBlockSVG.upperHeight],

            [WrapBlockSVG.stem, WrapBlockSVG.upperHeight],
            [WrapBlockSVG.stem, WrapBlockSVG.upperHeight + middleHeight],
            [WrapBlockSVG.width, WrapBlockSVG.upperHeight + middleHeight],
            [WrapBlockSVG.width, this.height],


            //socket
            [WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, this.height],
            [WrapBlockSVG.plugPos + WrapBlockSVG.plugWidth, this.height + WrapBlockSVG.plugHeight],
            [WrapBlockSVG.plugPos, this.height + WrapBlockSVG.plugHeight],
            [WrapBlockSVG.plugPos, this.height],

            [0, this.height],
        ]


        this.shape.points(shape.map((value) => ({ x: value[0], y: value[1] })))

    }

    draw() {
        num++;

        this.shape = this.polygon([{ x: 0, y: 0 }])
            .fill(WrapBlockSVG.fill)
            .stroke(WrapBlockSVG.stroke)
            .strokeWidth(WrapBlockSVG.strokeWidth);;
        // this.text(num + '', 10, 25);
        this.contentHeight = 0;
        this.updateShape();
    }
}

registerComponent(WrapBlockSVG);