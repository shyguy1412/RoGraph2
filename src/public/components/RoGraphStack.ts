import { RoGraphBlock } from '@blocks/RoGraphBlock';
import { dist } from 'assets/functions';
import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphScope } from './RoGraphScope';

/**
 * A stack of RoGraph blocks. Manages movement and insertion of blocks into other stacks.
 */
export class RoGraphStack extends RoGraphScope {
    //Mouse offset to stack origin at the start of drag
    offset!: { x: number; y: number; };
    private observer!: MutationObserver;

    get canvas() {
        return this.parentElement!;
    }

    //pixel value to determine when a block is close enough to be inserted
    static get connectionThreshold() { return 25 };

    // Getters and Setters for position
    set x(x: number) {
        this.setAttribute('x', x.toString());
    }
    get x() {
        return Number.parseInt(this.getAttribute('x')!);
    };

    set y(y: number) {
        this.setAttribute('y', y.toString());
    }
    get y() {
        return Number.parseInt(this.getAttribute('y')!);
    };

    //if block is currently attached to the mouse
    attached = false;

    //Initilise new stack
    init(): void {
        super.init();
        //sync position with style
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation, i) => {
                if (mutation.type != 'attributes') return;
                const element = mutation.target as HTMLElement;
                if (mutation.attributeName == 'x')
                    element.style.setProperty('--pos-x', element.getAttribute('x'));
                if (mutation.attributeName == 'y')
                    element.style.setProperty('--pos-y', element.getAttribute('y'));
            });
            if (this.childElementCount == 0) this.remove();
        });

        this.observer.observe(this, {
            attributes: true,
            childList: true
        });


        //initilize position and offset
        this.x = 0;
        this.y = 0;
        this.offset = {
            x: 0,
            y: 0
        }
    }

    //picks up a stack
    pickUpStack(e: MouseEvent) {
        this.attach(e);

        //stacks should be ordered by interaction
        const canvas = document.querySelector("rg-canvas") as HTMLElement;
        canvas.appendChild(this);
        console.log('PICKUP');

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

        //get all blocks
        const blocks =
            [...this.canvas.querySelectorAll<RoGraphBlock>('rg-stack .rg-block')]
                .filter(block => ![...this.children].includes(block)); //filter out this stack

        for (const block of blocks) {
            const blockBounds = this.getBoundingClientRect();
            //check all slots
            for (const slot of block.slots ?? []) {
                const slotBounds = slot.getBoundingClientRect();
                const distance = dist(stackBounds.x, stackBounds.y, slotBounds.x, slotBounds.y);
                if (distance < RoGraphStack.connectionThreshold) {
                    slot.connectStack(this);
                    return;
                }
            }
        }

        //get all scopes
        const scopes = [...this.canvas.querySelectorAll<RoGraphScope>('.rg-scope')]
        .filter(scope => scope != this); //filter out this stack

        for(const scope of scopes){
            const scopeBounds = scope.getBoundingClientRect();

            const distTopToBottom = dist(stackBounds.x, stackBounds.top, scopeBounds.x, scopeBounds.bottom);
            const distBottomToTop = dist(stackBounds.x, stackBounds.bottom, scopeBounds.x, scopeBounds.top);

            console.log(scope);
            
            if(distTopToBottom < RoGraphStack.connectionThreshold){
                const children = [...this.children].reverse();
                scope.append(...children);
                this.remove();
                return;
            }

            if(distBottomToTop < RoGraphStack.connectionThreshold){
                const children = [...this.children].reverse();
                scope.prepend(...children);
                if(scope instanceof RoGraphStack){
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
    attach(e: MouseEvent) {
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
        this.observer.disconnect();
    }
}

registerComponent(RoGraphStack);
