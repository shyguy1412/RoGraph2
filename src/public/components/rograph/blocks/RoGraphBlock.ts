import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@rograph/RoGraphElement";
import { RoGraphSlot } from "@rograph/RoGraphSlot";

export abstract class RoGraphBlock extends RoGraphElement {
    svg!: GeckoSVG;

    // get slots() {
    //     return [...this.querySelectorAll('.rg-slot')] as RoGraphSlot[];
    // }

    constructor() {
        super();
        this.svg = this.defineSVG();

        const observer = new MutationObserver((mutations) => {
            // const relevantMutations = mutations.filter(mutation => this.slots.includes(<RoGraphSlot>mutation.target))
            // relevantMutations.forEach(mutation => this.slotUpdate(<RoGraphSlot>mutation.target));
        });

        observer.observe(this, {
            childList: true,
            subtree: true
        });

        const slots = this.defineSlots();

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/style.css" />`;
        shadow.innerHTML += /*html*/`<link rel="stylesheet" href="css/rograph/${this.constructor.name}.css" />`;
        shadow.appendChild(this.svg);
        shadow.append(...slots);
        slots.forEach((slot, index) => slot.innerHTML += /*html*/`<slot name='slot${index}'></slot>`)
    }

    init(): void {
    }

    abstract defineSlots(): RoGraphSlot[];
    abstract defineSVG(): GeckoSVG;

    abstract slotUpdate(slot: RoGraphSlot): void;

}