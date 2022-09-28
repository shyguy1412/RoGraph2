import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@components/RoGraphElement";
import { RoGraphSlot } from "@components/RoGraphSlot";

export abstract class RoGraphBlock extends RoGraphElement {
    svg!: GeckoSVG;

    get slots() {
        return [...this.querySelectorAll('.rg-slot')] as RoGraphSlot[];
    }

    constructor() {
        super();
        this.svg = this.defineSVG();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.innerHTML += '<slot></slot>'
        shadow.appendChild(this.svg);
    }

    init(): void {
        this.classList.add('rg-block');
        const slots = [...this.defineSlots()];
        this.append(...slots);

        const observer = new MutationObserver((mutations) => {
            const relevantMutations = mutations.filter(mutation => this.slots.includes(<RoGraphSlot>mutation.target))  
            console.log(relevantMutations);

            relevantMutations.forEach(mutation => this.slotUpdate(<RoGraphSlot>mutation.target));
        });

        observer.observe(this, {
            childList: true,
            subtree: true
        });
    }

    abstract defineSlots(): RoGraphSlot[];
    abstract defineSVG(): GeckoSVG;

    abstract slotUpdate(slot: RoGraphSlot): void;

}