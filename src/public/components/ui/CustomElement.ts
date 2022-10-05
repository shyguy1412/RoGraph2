interface CustomElementConstructor {
    readonly tag: string,
    new(): CustomElement
};

export abstract class CustomElement extends HTMLElement {
    static get tag() {
        return this.name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-');
    }

    //runs when element is created with create()
    constructor() {
        super();
    }

    abstract html():string;
    abstract applyListeners():void;

    //creates an instance of the element
    static create<T extends CustomElement>(type?: new () => T): T {
        const tag = type ? (type as unknown as typeof CustomElement).tag : this.tag

        if (!window.customElements.get(tag)) throw new Error(`[CustomElement] ${tag} is not a registered component`)

        const el = document.createElement(tag) as T;
        el.innerHTML = el.html();
        el.applyListeners();
        return el;
    }

}

export function registerComponent(constructor: CustomElementConstructor) {
    if (!(constructor.prototype instanceof CustomElement)) throw new Error(); //TODO: throw error
    if (!window.customElements.get(constructor.tag)) {
        window.customElements.define(constructor.tag, constructor);
    } else {
        console.warn(`[CustomElement] ${constructor.tag} is already defined`);
    }
}