import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@rograph/RoGraphElement";
import { RoGraphSlot } from "@rograph/RoGraphSlot";

export abstract class RoGraphBlock extends RoGraphElement {
    svg!: GeckoSVG;

    constructor() {
        super();
        this.svg = this.defineSVG();

        const slots = this.defineSlots();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/style.css" />`;
        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/rograph/${this.constructor.name}.css" />`;
        shadow.appendChild(this.svg);
        shadow.append(...slots);

        slots.forEach((slot, index) => {
            const slotEl = document.createElement('slot');
            slotEl.setAttribute('name', 'slot' + index);
            slotEl.addEventListener('slotchange', () => this.updateShape());
            slot.append(slotEl);
        })

        const resizeObserver = new ResizeObserver(() => {
            try { (this.parentElement as RoGraphBlock).updateShape(); } catch (_) { }
        });
        resizeObserver.observe(this);
    }

    abstract defineSlots(): RoGraphSlot[];
    abstract defineSVG(): GeckoSVG;

    abstract updateShape(): void;

}