import { dist } from "public/assets/functions";
import { RoGraphBlock } from "./blocks/RoGraphBlock";
import { RoGraphStackBlock } from "./blocks/RoGraphStackBlock";
import { RoGraphScope } from "./RoGraphScope";

export class RoGraphContentSlot extends RoGraphScope {

  pos;
  slotEl!: HTMLSlotElement;

  get parent(): RoGraphBlock {
    const parent = super.parent;
    if (!(parent instanceof RoGraphBlock))
      throw new Error('ContentSlot needs Block as parent element!');
    return parent;
  }

  constructor() {
    super();
    const self = this;
    this.pos = {
      get x() {
        return Number.parseInt(self.style.left.slice(0, -2));
      },
      set x(x: number) {
        self.style.left = (x || 0) + 'px';
      },
      get y() {
        return Number.parseInt(self.style.top.slice(0, -2));
      },
      set y(y: number) {
        self.style.top = (y || 0) + 'px';
      }
    }
  }

  init(): void {

    this.setAttribute('part', 'content-slot');

    this.slotEl = document.createElement('slot');
    this.appendChild(this.slotEl);

    const observer = new MutationObserver((mutations) => {
      this.slotEl.setAttribute('name', this.getAttribute('name') ?? '');
    })
    observer.observe(this, { attributes: true, childList: false });

    this.slotEl.setAttribute('name', this.getAttribute('name') ?? '');
    this.slotEl.addEventListener('slotchange', () => this.parent.updateShape());
  }

  canAppend(scope: RoGraphScope): boolean {
    for (const child of [...this.parent.children, ...scope.children]) {
      // console.log(child, child instanceof RoGraphStackBlock);
      if(!(child instanceof RoGraphStackBlock))
        return false;
    }

    const selfBounds = this.getBoundingClientRect();
    const scopeBounds = scope.getBoundingClientRect();
    const distTopToBottom = dist(selfBounds.x, selfBounds.bottom, scopeBounds.x, scopeBounds.top);
    return distTopToBottom < RoGraphScope.connectionThreshold;
  }

  canPrepend(scope: RoGraphScope): boolean {
    return false;
    // const selfBounds = this.getBoundingClientRect();
    // const scopeBounds = scope.getBoundingClientRect();
    // const distBottomToTop = dist(selfBounds.x, selfBounds.top, scopeBounds.x, scopeBounds.bottom);
    // return distBottomToTop < RoGraphScope.connectionThreshold
  }

  append(...blocks: RoGraphBlock[]): void {
    const slotName = this.slotEl.getAttribute('name') ?? '';
    this.parent.insertToSlot(slotName, blocks);
  }
}
