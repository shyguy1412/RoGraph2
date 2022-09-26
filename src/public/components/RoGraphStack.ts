import { RoGraphBlock } from '@blocks/RoGraphBlock';
import { dist } from 'assets/functions';
import { registerComponent, RoGraphElement } from './RoGraphElement';

/**
 * A stack of RoGraph blocks. Manages movement and insertion of blocks into other stacks.
 * A block always needs to be inside a stack
 */
export class RoGraphStack extends RoGraphElement {
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
    }

    dropStack(e: MouseEvent) {
        this.attached = false;

        //delete stack if outside on the left
        if (this.x < 0) {
            this.deleteStack();
            return;
        };

        //get all blocks
        const blocks =
            [...this.canvas.querySelectorAll<RoGraphBlock>('rg-stack .rg-block')]
                .filter(block => ![...this.children].includes(block));

        const stackBounds = this.getBoundingClientRect();

        outer: for (const block of blocks) {
            const blockBounds = block.getBoundingClientRect();
            for (const connector of block.connectors ?? []) {
                const clientConnectorX = blockBounds.x + connector.pos.x;
                const clientConnectorY = blockBounds.y + connector.pos.y;
                const distance = dist(stackBounds.x, stackBounds.y, clientConnectorX, clientConnectorY);
                if (distance < RoGraphStack.connectionThreshold) {
                    connector.connectStack(this);
                    break outer;
                }
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