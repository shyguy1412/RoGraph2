import { dist } from "public/assets/functions";
import { RoGraphBlock } from "./blocks/RoGraphBlock";
import { RoGraphValueBlock } from "./blocks/RoGraphValueBlock";
import { RoGraphScope } from "./RoGraphScope";

export class RoGraphValueSlot extends RoGraphScope {

  get parent(): RoGraphBlock {
    const parent = super.parent;
    if (!(parent instanceof RoGraphBlock))
      throw new Error('ValueSlot needs Block as parent element!');
    return parent;
  }

  private slotEl!:HTMLSlotElement;

  init(): void {
    this.setAttribute('part', 'value-slot');

    this.slotEl = document.createElement('slot');
    this.appendChild(this.slotEl);

    const observer = new MutationObserver((mutations) => {
      this.slotEl.setAttribute('name', this.getAttribute('name') ?? '');
    })
    observer.observe(this, {attributes: true, childList: false});
   
    this.slotEl.setAttribute('name', this.getAttribute('name') ?? '');
  }

  canAppend(scope: RoGraphScope): boolean {
    // if(this.childElementCount != 0) return false;
    if(this.slotEl.assignedElements().length != 0) return false;
    if(scope.children.length != 1) return false;

    const block = scope.firstElementChild;
    if(!(block instanceof RoGraphValueBlock)) return false;

    const selfType = this.getAttribute('type');
    const blockType = block.returnType;

    // console.log({selfType, blockType, block});

    if(!selfType || selfType != blockType) return false;
    
    const selfBounds = this.getBoundingClientRect();
    const scopeBounds = scope.getBoundingClientRect();
    const distance = dist(selfBounds.x, selfBounds.y, scopeBounds.x, scopeBounds.y);
    return distance < RoGraphScope.connectionThreshold;
  }

  canPrepend(scope: RoGraphScope): boolean {
    return false
  }

  append(...blocks: RoGraphBlock[]): void {
    const slotName = this.getAttribute('name') ?? '';
    this.parent.insertToSlot(slotName, blocks);
  }
}
