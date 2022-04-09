interface RoGraphElementConstructor extends CustomElementConstructor {
    tag: string,
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
    static create(): RoGraphElement {
        const el = document.createElement(this.tag) as RoGraphElement;
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