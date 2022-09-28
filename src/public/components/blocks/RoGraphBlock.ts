import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@components/RoGraphElement";
import { RoGraphSlot } from "@components/RoGraphSlot";

export abstract class RoGraphBlock extends RoGraphElement {
    svg!: GeckoSVG;

    get slots(){
        return [...this.querySelectorAll('rg-slot')] as RoGraphSlot[];
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
    }

    abstract defineSlots(): RoGraphSlot[];
    abstract defineSVG(): GeckoSVG;

}