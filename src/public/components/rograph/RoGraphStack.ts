import { dist } from '../../assets/functions';
import { RoGraphBlock } from './blocks/RoGraphBlock';
import { RoGraphStackBlock } from './blocks/RoGraphStackBlock';
import { RoGraphValueBlock } from './blocks/RoGraphValueBlock';
import { RoGraphWrapBlock } from './blocks/RoGraphWrapBlock';
import { RoGraphCanvas } from './RoGraphCanvas';
import { RoGraphScope } from './RoGraphScope';
import { RoGraphValueSlot } from './RoGraphValueSlot';

/**
 * A stack of RoGraph blocks. Manages movement and insertion of blocks into other stacks.
 */
export class RoGraphStack extends RoGraphScope {
  //Mouse offset to stack origin at the start of drag
  offset!: { x: number; y: number; };

  get canvas(): RoGraphCanvas {
    if (!(this.parentElement instanceof RoGraphCanvas))
      throw new Error('Stack must be child of Canvas');
    return this.parentElement;
  }

  // Getters and Setters for position
  set x(x: number) {
    this.style.left = x + 'px';
  }

  get x() {
    return Number.parseInt(this.style.left || '0');
  };

  set y(y: number) {
    this.style.top = y + 'px';
  }

  get y() {
    return Number.parseInt(this.style.top || '0');
  };

  //if block is currently attached to the mouse
  attached = false;

  init(): void {
    this.offset = {
      x: 0,
      y: 0
    }

    const x = this.getAttribute('x') as number | null;
    const y = this.getAttribute('y') as number | null;
    this.x = x ?? this.x;
    this.y = y ?? this.y;

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      const x = this.getAttribute('x') as number | null;
      const y = this.getAttribute('y') as number | null;

      if (mutations[0].attributeName != 'style') {
        this.x = x ?? this.x;
        this.y = y ?? this.y;
      } else if (x != this.x || y != this.y) {
        this.setAttribute('x', this.x + '');
        this.setAttribute('y', this.y + '');
      }

      if (this.childElementCount == 0)
        this.remove();
    })

    observer.observe(this, { attributes: true, subtree: false, childList: true });
  }

  //picks up a stack
  pickUp(e: MouseEvent) {
    this.attach(e);
    //stacks should be ordered by interaction
    const canvas = document.querySelector("rg-canvas") as HTMLElement;

    if (canvas.lastElementChild != this)
      canvas.appendChild(this);
  }

  dropStack(e: MouseEvent) {
    this.attached = false;

    //delete stack if outside on the left
    if (this.x < 0) {
      this.deleteStack();
      return;
    };

    this.resolveInsertions();
  }

  private resolveInsertions() {
    //TODO: Optimize
    // const stackBounds = this.getBoundingClientRect();

    const scopes = this.canvas.getScopes()
      .filter(scope => scope != this);

    for (const scope of scopes) {
      //append scope
      if (scope.canAppend(this)) {
        scope.append(...this.children);
        break;
      }

      //prepend scope
      if (scope.canPrepend(this)) {
        if (scope instanceof RoGraphStack)
          scope.y -= this.getBoundingClientRect().height;

        scope.prepend(...this.children);
        break;
      }
    }

  }

  canAppend(scope: RoGraphScope): boolean {
    for(const child of [...this.children, ...scope.children]){
      if(!(child instanceof RoGraphStackBlock))
        return false;
    }

    const selfBounds = this.getBoundingClientRect();
    const scopeBounds = scope.getBoundingClientRect();
    const distBottomToTop = dist(selfBounds.x, selfBounds.bottom, scopeBounds.x, scopeBounds.top);
    return distBottomToTop < RoGraphScope.connectionThreshold
  }

  canPrepend(scope: RoGraphScope): boolean {
    for(const child of [...this.children, ...scope.children]){
      if(!(child instanceof RoGraphStackBlock))
        return false;
    }

    const selfBounds = this.getBoundingClientRect();
    const scopeBounds = scope.getBoundingClientRect();
    const distTopToBottom = dist(selfBounds.x, selfBounds.top, scopeBounds.x, scopeBounds.bottom);
    return distTopToBottom < RoGraphScope.connectionThreshold;
  }

  followMouse(e: MouseEvent) {
    if (!this.attached) return;

    const canvas = document.querySelector('rg-canvas')!.getBoundingClientRect();
    this.x = e.clientX - this.offset.x - canvas.x;
    this.y = e.clientY - this.offset.y - canvas.y;
  }

  /**
   * forces the stack to attach to mouse
   */
  private attach(e: MouseEvent) {
    const canvas = document.querySelector("rg-canvas")!.getBoundingClientRect();
    this.offset.x = e.clientX - this.x - canvas.x;
    this.offset.y = e.clientY - this.y - canvas.y;

    this.attached = true;
  }

  /**
   * forces the stack to detach from mouse
   */
  detach() {
    this.attached = false;
  }

  deleteStack() {
    this.remove();
  }
}

