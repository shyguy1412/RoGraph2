export abstract class RoGraphElement extends HTMLElement {
    static get tag() {
        return this.name.toLowerCase().replace('rograph', 'rg-');
    }
    private isInit = false;

    //runs when element is created with create()
    constructor() {
        super();
    }

    connectedCallback() {
        if(!this.isInit)this.init();
        this.isInit = true;
    }

    //initilise component after creation
    abstract init(): void;

    //creates an instance of the element
    static create<T extends RoGraphElement>(type?: new () => T): T {
        const tag = type ? (type as unknown as typeof RoGraphElement).tag : this.tag

        if (!window.customElements.get(tag)) throw new Error(`[RoGraph] ${tag} is not a registered component`)

        const el = document.createElement(tag) as T;
        return el;
    }

}

export function registerComponent(constructor: typeof RoGraphElement & (new () => RoGraphElement)) {
  if (!(constructor.prototype instanceof RoGraphElement)) throw new Error(); //TODO: throw error
  if (!window.customElements.get(constructor.tag)) {
    window.customElements.define(constructor.tag, constructor);
  } else {
    console.warn(`[RoGraph] ${constructor.tag} is already defined`);
  }
}