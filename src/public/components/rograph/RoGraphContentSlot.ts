import { RoGraphScope } from "./RoGraphScope";

export class RoGraphContentSlot extends RoGraphScope {

    pos;

    constructor() {
        super();
        const self = this;
        this.pos = {
            get x() {
                return Number.parseInt(self.style.left.slice(0, -2));
            },
            set x(x:number) {
                self.style.left = (x || 0) + 'px';
            },
            get y() {
                return Number.parseInt(self.style.top.slice(0, -2));
            },
            set y(y:number) {
                self.style.top = (y || 0) + 'px';
            }
        }
    }

    init() { };
    selfStyle = this.style;


    connectedCallback(): void {
        this.style.position = 'absolute';
    }
}
