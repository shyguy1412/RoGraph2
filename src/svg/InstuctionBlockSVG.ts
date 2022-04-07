import { applyAttributes, GeckoSVG } from "geckosvg";

export class InstructionBlockSVG {
    gecko: GeckoSVG;

    constructor(parent:HTMLElement) {
        this.gecko = GeckoSVG.createElement(100, 40);
        const polygon = this.gecko.polygon([
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 40 },
            { x: 0, y: 40 },
        ]);
        applyAttributes(polygon, {
            fill: 'blue',
            stroke: 'red'
        });
        parent.append(this.gecko);
    }
}