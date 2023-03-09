import { RoGraphBlock } from "./blocks/RoGraphBlock";
import { RoGraphElement } from "./RoGraphElement";
import { RoGraphValueSlot } from "./RoGraphValueSlot";

export class RoGraphLabel extends RoGraphElement {

  get slots() {
    return [...this.querySelectorAll<RoGraphValueSlot>('rg-valueslot')];
  }

  init(): void {
    this.setAttribute('part', 'label');


    const resizeObserver = new ResizeObserver(() => {
      try { (this.parent as RoGraphBlock).updateShape(this); } catch (_) {
        // console.log(_);
      }
      // console.log(this.getRootNode());
    })

    const attributeObserver = new MutationObserver((mutations) => {
      this.innerHTML = this.parseLabel();
    });

    resizeObserver.observe(this);
    attributeObserver.observe(this, { attributes: true, childList: false, subtree: false })
  }

  parseLabel() {
    const labelCode = this.getAttribute('label-code') ?? '';
    const slot = (index: number) => /*html*/`<rg-valueslot type="$1" name="value${index}"></rg-valueslot>`

    //prolly bad but idc it works
    const label = labelCode.split(/@([a-zA-Z0-9])*/)
      .reduce((prev, _, index) => prev.replace(/@([a-zA-Z0-9]*)/, slot(index)), labelCode);

    return label;
  }
}
