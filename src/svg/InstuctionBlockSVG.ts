import { applyAttributes, GeckoSVG, registerComponent } from "geckosvg";

const fill = '#FF961E';
const stroke = '#C86400';

export class InstructionBlockSVG extends GeckoSVG {
    static get tag() {
        return 'rg-instruction-block-svg'
    };

    init() {
        this.width = 150;
        this.height = 40;

        const plugWidth = 15;
        const plugHeight = 5;
        const plugPos = 10;
        const strokeWidth = 3;

        const shape = [
            [strokeWidth, strokeWidth + plugHeight],

            //plug
            [strokeWidth + plugPos, strokeWidth + plugHeight],
            [strokeWidth + plugPos, strokeWidth],
            [strokeWidth + plugPos + plugWidth, strokeWidth],
            [strokeWidth + plugPos + plugWidth, strokeWidth + plugHeight],

            [this.width - strokeWidth, strokeWidth + plugHeight],
            [this.width - strokeWidth, this.height - strokeWidth],

            //socket
            [strokeWidth + plugPos + plugWidth, this.height - strokeWidth],
            [strokeWidth + plugPos + plugWidth, this.height - strokeWidth - plugHeight],
            [strokeWidth + plugPos, this.height - strokeWidth - plugHeight],
            [strokeWidth + plugPos, this.height - strokeWidth],

            [strokeWidth, this.height - strokeWidth],
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
    }
}

registerComponent(InstructionBlockSVG);