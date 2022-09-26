import { GeckoSVG } from "geckosvg";
import { RoGraphElement } from "../RoGraphElement";

export class RoGraphBlockSocket {
    constructor(parent: RoGraphBlock, pos: { x: number, y: number }) {

    }
}

export class RoGraphBlockPlug {
    constructor(parent: RoGraphBlock, pos: { x: number, y: number }) {

    }
}

export abstract class RoGraphBlock extends RoGraphElement {
    private socket: RoGraphBlockSocket | null;
    private plugs: RoGraphBlockPlug[] | null;
    private svg: GeckoSVG;

    constructor() {
        super();
        this.socket = this.defineSocket();
        this.plugs = this.definePlugs();
        this.svg = this.defineSVG();

        const shadow = this.attachShadow({mode: 'closed'});
        shadow.appendChild(this.svg);
    }

    abstract definePlugs():typeof this.plugs;
    abstract defineSocket():typeof this.socket;
    abstract defineSVG():GeckoSVG;

}