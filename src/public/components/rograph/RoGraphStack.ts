import { dist } from '../../assets/functions';
import { RoGraphBlock } from './blocks/RoGraphBlock';
import { RoGraphWrapBlock } from './blocks/RoGraphWrapBlock';
import { registerComponent } from './RoGraphElement';
import { RoGraphScope } from './RoGraphScope';

/**
 * A stack of RoGraph blocks. Manages movement and insertion of blocks into other stacks.
 */
export class RoGraphStack extends RoGraphScope {
    //Mouse offset to stack origin at the start of drag
    offset!: { x: number; y: number; };

    get canvas() {
        return this.parentElement!;
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
        })

        observer.observe(this, { attributes: true, subtree: false, childList: false });
    }

    //picks up a stack
    pickUp(e: MouseEvent) {
        this.attach(e);

        //stacks should be ordered by interaction
        const canvas = document.querySelector("rg-canvas") as HTMLElement;

        if (canvas.lastChild != this)
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

    resolveInsertions() {
        //TODO: Optimize
        const stackBounds = this.getBoundingClientRect();

        //get all scopes
        const scopes = [...this.canvas.querySelectorAll<RoGraphScope>('rg-stack')]
            .filter(scope => scope != this); //filter out this stack

        const contentSlots: RoGraphScope[] = [];

        this.canvas.querySelectorAll<RoGraphWrapBlock>('rg-wrapblock').forEach(block => {
            contentSlots.push(...block.getContent());
        })

        for (const slot of contentSlots){
            const slotBounds = slot.getBoundingClientRect();

            const distTopToBottom = dist(stackBounds.x, stackBounds.top, slotBounds.x, slotBounds.bottom);
            const block = (slot.getRootNode() as ShadowRoot).host as RoGraphWrapBlock;
            
            //TODO: read slot index

            if (distTopToBottom < RoGraphScope.connectionThreshold) {
                const children = [...this.children] as RoGraphBlock[];
                const slotAttr = slot.children[0].getAttribute('name');
                if(slotAttr == null)throw Error('Invalid Slot');
                block.insertToSlot(slotAttr, children);
                this.remove();
                return;
            }
        }

        for (const scope of scopes) {
            const scopeBounds = scope.getBoundingClientRect();

            const distTopToBottom = dist(stackBounds.x, stackBounds.top, scopeBounds.x, scopeBounds.bottom);
            const distBottomToTop = dist(stackBounds.x, stackBounds.bottom, scopeBounds.x, scopeBounds.top);

            if (distTopToBottom < RoGraphScope.connectionThreshold) {
                const children = [...this.children];
                scope.append(...children);
                this.remove();
                return;
            }

            if (distBottomToTop < RoGraphScope.connectionThreshold && scope instanceof RoGraphStack) {
                const children = [...this.children];
                scope.prepend(...children);
                if (scope instanceof RoGraphStack) {
                    scope.y -= stackBounds.height;
                }
                this.remove();
                return;
            }

        }
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

