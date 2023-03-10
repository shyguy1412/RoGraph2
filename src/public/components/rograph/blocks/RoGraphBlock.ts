import { RoGraphElement } from "@rograph/RoGraphElement";
import { RoGraphLabel } from "@rograph/RoGraphLabel";
import { RoGraphScope } from "@rograph/RoGraphScope";
import { RoGraphSVG } from "@svg/RoGraphSVG";

export abstract class RoGraphBlock extends RoGraphElement {
  svg!: RoGraphSVG;
  label: RoGraphLabel;

  constructor() {
    super();
    this.svg = this.defineSVG();
    this.label = RoGraphElement.create(RoGraphLabel);

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(this.svg);

    const resizeObserver = new ResizeObserver(() => {
      try { (this.parentElement as RoGraphBlock).updateShape(); } catch (_) { }
    });

    this.shadowRoot!.append(this.label);
    resizeObserver.observe(this);
  }

  insertToSlot(slot: string, blocks: RoGraphBlock[]) {
    blocks.forEach(block => block.setAttribute('slot', slot));
    this.append(...blocks);
  }

  getScopes(): RoGraphScope[] {
    const elements = [...this.shadowRoot!.querySelectorAll('*')];
    return elements
      .filter((el): el is RoGraphScope => el instanceof RoGraphScope);
  }

  abstract defineSVG(): RoGraphSVG;

  updateShape(label: RoGraphLabel | void) { this.svg.updateShape(this) };

}