import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "@components/RoGraphElement";
import { RoGraphStack } from "@components/RoGraphStack";

export class RoGraphBlockConnector {
    pos: { x: number, y: number };
    parent: HTMLElement;

    constructor(parent: HTMLElement, pos: { x: number, y: number }) {
        this.parent = parent;
        this.pos = pos;
    }

    connectStack(stack:RoGraphStack):void{
        const blocks = [...stack.children].reverse();
        for(const block of blocks){
            this.parent.after(block);
        }
    }
}

export abstract class RoGraphBlock extends RoGraphElement {
    connectors: RoGraphBlockConnector[];
    private svg: GeckoSVG;

    constructor() {
        super();
        this.connectors = this.defineConnectors();
        this.svg = this.defineSVG();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(this.svg);
    }

    init(): void {
        this.classList.add('rg-block');
    }

    abstract defineConnectors(): typeof this.connectors;
    abstract defineSVG(): GeckoSVG;

}