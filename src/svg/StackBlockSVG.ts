import { applyAttributes, GeckoSVG, registerComponent } from "geckosvg";

const fill = '#FF961E';
const stroke = '#C86400';
const plugWidth = 18;
const plugHeight = 8;
const plugPos = 15;
const strokeWidth = 3

let num = 0;

export class StackBlockSVG extends GeckoSVG {


    init() {
        num++;
        this.width = 150;
        this.height = 40;

        const shape = [
            [0, 0],

            //plug
            [plugPos, 0],
            [plugPos, -plugHeight],
            [plugPos + plugWidth, -plugHeight],
            [plugPos + plugWidth, 0],

            [this.width, 0],
            [this.width, this.height],

            //socket
            [plugPos + plugWidth, this.height],
            [plugPos + plugWidth, this.height - plugHeight],
            [plugPos, this.height - plugHeight],
            [plugPos, this.height],

            [0, this.height],
        ]


        const polygon = this.polygon(shape.map((value) => {
            return {
                x: value[0],
                y: value[1],
            }
        }));
        applyAttributes(polygon, {
            fill,
            stroke,
            "stroke-width": strokeWidth + 'px',
        });

        const text = this.text(num + '', 10, 25);

    }
}

registerComponent(StackBlockSVG);