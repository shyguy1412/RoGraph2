import { RoGraphStack } from "./RoGraphStack";

interface RoGraphElementConstructor {
    tag: string,
    new(): RoGraphElement
};

export class RoGraphElement extends HTMLElement {
    static get tag() {
        return this.name.toLowerCase().replace('rograph', 'rg-');
    }

    //runs when element is created with create()
    constructor() {
        super();
    }

    //initilise component after creation
    init() { };

    //creates an instance of the element
    static create<T extends RoGraphElement>(type?: new () => T): T {
        const el = document.createElement(
            type ? (type as unknown as typeof RoGraphElement).tag : this.tag
        ) as T;
        el.init();
        return el;
    }

}

export function registerComponent(constructor: RoGraphElementConstructor) {
    if (!(constructor.prototype instanceof RoGraphElement || constructor === RoGraphElement)) throw new Error(); //TODO: throw error
    if (!window.customElements.get(constructor.tag)) {
        window.customElements.define(constructor.tag, constructor);
    } else {
        if (constructor == RoGraphElement)
            console.warn(`[RoGraphElement] ${constructor.tag} is already defined`);
    }
}