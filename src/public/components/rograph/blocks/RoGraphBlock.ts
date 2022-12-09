import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@rograph/RoGraphElement";
import { RoGraphSlot } from "@rograph/RoGraphSlot";

export abstract class RoGraphBlock extends RoGraphElement {
    svg!: GeckoSVG;

    constructor() {
        super();
        this.svg = this.defineSVG();

        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/style.css" />`;
        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/rograph/${this.constructor.name}.css" />`;
        shadow.appendChild(this.svg);
        
        const resizeObserver = new ResizeObserver(() => {
            try { (this.parentElement as RoGraphBlock).updateShape(); } catch (_) { }
        });
        resizeObserver.observe(this);
    }

    abstract defineSVG(): GeckoSVG;

    abstract updateShape(): void;

}