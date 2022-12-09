import { registerComponent } from "geckosvg";
import { GeckoSVGPolygonElement } from "geckosvg/dist/elements/renderable/shape/GeckoSVGPolygonElement";
import { RoGraphSVG } from "./RoGraphSVG";


export class StackBlockSVG extends RoGraphSVG {
    static readonly fill = '#FF961E';
    static readonly stroke = '#C86400';
    static readonly plugWidth = 18;
    static readonly plugHeight = 5;
    static readonly plugPos = 15;
    static readonly strokeWidth = 3
    shape!: GeckoSVGPolygonElement;

    labelWidth!:number;
    labelHeight!:number;

    updateShape() {

        this.width = 20 + this.labelWidth;
        this.height = 20 + this.labelHeight;


        const shape = [
            [0, 0],

            //plug
            [StackBlockSVG.plugPos, 0],
            [StackBlockSVG.plugPos, +StackBlockSVG.plugHeight],
            [StackBlockSVG.plugPos + StackBlockSVG.plugWidth, +StackBlockSVG.plugHeight],
            [StackBlockSVG.plugPos + StackBlockSVG.plugWidth, 0],

            [this.width, 0],
            [this.width, this.height],

            //socket
            [StackBlockSVG.plugPos + StackBlockSVG.plugWidth, this.height],
            [StackBlockSVG.plugPos + StackBlockSVG.plugWidth, this.height + StackBlockSVG.plugHeight],
            [StackBlockSVG.plugPos, this.height + StackBlockSVG.plugHeight],
            [StackBlockSVG.plugPos, this.height],

            [0, this.height],
        ]

        this.shape.points(shape.map((value) => ({ x: value[0], y: value[1] })))
    }

    draw(){
        this.labelHeight = 0;
        this.labelWidth = 0;
        this.shape = this.polygon([{ x: 0, y: 0 }])
            .fill(StackBlockSVG.fill)
            .stroke(StackBlockSVG.stroke)
            .strokeWidth(StackBlockSVG.strokeWidth);;
        this.updateShape();
    }
}

registerComponent(StackBlockSVG);