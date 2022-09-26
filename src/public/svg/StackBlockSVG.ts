import { GeckoSVG, registerComponent } from "geckosvg";
import { RoGraphSVG } from "./RoGraphSVG";

const fill = '#FF961E';
const stroke = '#C86400';
const plugWidth = 18;
const plugHeight = 5;
const plugPos = 15;
const strokeWidth = 3
const width = 150;
const height = 40;

let num = 0;

export class StackBlockSVG extends RoGraphSVG {

    draw() {
        num++;
        this.width = width;
        this.height = height;

        const shape = [
            [0, 0],

            //plug
            [plugPos, 0],
            [plugPos, +plugHeight],
            [plugPos + plugWidth, +plugHeight],
            [plugPos + plugWidth, 0],

            [this.width, 0],
            [this.width, this.height],

            //socket
            [plugPos + plugWidth, this.height],
            [plugPos + plugWidth, this.height + plugHeight],
            [plugPos, this.height + plugHeight],
            [plugPos, this.height],

            [0, this.height],
        ]


        this.polygon(shape.map((value) => ({x: value[0],y: value[1]})))
        .fill(fill)
        .stroke(stroke)
        .strokeWidth(strokeWidth);

        this.text(num + '', 10, 25);

    }
}

registerComponent(StackBlockSVG);