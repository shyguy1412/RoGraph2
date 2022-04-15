import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphStackBlock } from './RoGraphStackBlock';

export class RoGraphStack extends RoGraphElement {
    offset!: { x: number; y: number; };

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

    attached = false;
    static idc = 0;
    n!: number;
    init(): void {
        this.n = RoGraphStack.idc;
        RoGraphStack.idc++;
        //sync position with style
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation, i) => {
                if (mutation.type != 'attributes') return;
                const element = mutation.target as HTMLElement;
                if (mutation.attributeName == 'x')
                    element.style.setProperty('--pos-x', element.getAttribute('x'));
                if (mutation.attributeName == 'y')
                    element.style.setProperty('--pos-y', element.getAttribute('y'));
            });
        });

        observer.observe(this, {
            attributes: true
        });


        //initilize position and offset
        this.x = 0;
        this.y = 0;


        this.offset = {
            x: 0,
            y: 0
        }
    }

    pickUpStack(e: MouseEvent) {
        const canvas = document.querySelector("rg-canvas") as HTMLElement;
        //seperate stack if clicked element isnt head of stack
        if (!e.composedPath().includes(this.firstElementChild!)) {
            //TODO: bad, doesnt scale for other blocktypes
            //SOLUTION: switchcase to determin blocktype, handle each accordingly
            const element = e.composedPath().find((element) => element instanceof RoGraphStackBlock)! as RoGraphElement;
            const bounds = element.getBoundingClientRect();
            let newStack!: RoGraphStack;
            switch (element.constructor) {
                case RoGraphStackBlock:
                    newStack = this.separateAtStackBlock(element);
                    break;

                default:
                    break;
            }

            newStack.x = bounds.x - canvas.getBoundingClientRect().left;
            newStack.y = bounds.y - canvas.getBoundingClientRect().top;
            //-3 for weird offset reasons
            newStack.offset.x = e.clientX - bounds.x + 3;
            newStack.offset.y = e.clientY - bounds.y;
            newStack.attach();
            //call followMouse once to set right position
            newStack.followMouse(e);

            return;
        }


        this.attached = true;

        const bounds = this.getBoundingClientRect();
        this.offset.x = e.clientX - bounds.x;
        this.offset.y = e.clientY - bounds.y;

        canvas.appendChild(this);

    }

    dropStack(e: MouseEvent) {
        this.attached = false;

        //get all stacks
        const stacks = [...this.parentElement!.querySelectorAll('rg-stack')] as RoGraphStack[];

        for (const stack of stacks) {
            const insertion = this.checkInsertion(stack);
            if (insertion) {
                this.insertIntoStack(insertion);
                break;
            }
        }

        //delete stack if outside on the left
        if (this.x < 0) this.deleteStack();
    }

    followMouse(e: MouseEvent) {
        if (!this.attached) return;

        const canvas = document.querySelector('rg-canvas')!.getBoundingClientRect();
        this.x = e.clientX - this.offset.x - canvas.left;
        this.y = e.clientY - this.offset.y - canvas.top;
    }

    deleteStack() {
        this.remove();
    }

    separateAtStackBlock(at: RoGraphStackBlock) {
        const index = Array.from(at.parentNode!.children).indexOf(at);
        const newStack = this.separateAtIndex(index);

        return newStack;
    }

    separateAtIndex(at: number): RoGraphStack {
        const newStack = RoGraphStack.create() as RoGraphStack;
        const blocks: ChildNode[] = [];
        this.childNodes.forEach((node, index) => {
            if (index >= at) {
                blocks.push(node)
            };
        });
        blocks.forEach((block) => block.remove());
        newStack.append(...blocks);
        this.parentElement?.append(newStack);
        return newStack
    }

    insertIntoStack(insertion: { el: RoGraphElement, before: boolean }) {
        console.log(insertion);
        //get all blocks as array
        const children = [...this.querySelectorAll<RoGraphElement>('rg-stack>*')];
        //if before, insert all children before el
        if (insertion.before) {
            //get bottom of stack
            const stack = insertion.el.parentElement! as RoGraphStack;
            const stackBottomBefore = stack.getBoundingClientRect().bottom;
            children.forEach(child => {
                insertion.el.before(child);
            });
            const stackBottomAfter = stack.getBoundingClientRect().bottom;
            console.log(stackBottomBefore, stackBottomAfter, stackBottomBefore - stackBottomAfter);
            
            stack.y -= stackBottomAfter - stackBottomBefore;
            console.log(stack);
            
        } else {
            children.reverse();
            children.forEach(child => {
                insertion.el.after(child);
            });
        }
        this.remove();
    }

    checkInsertion(stack: RoGraphStack) {
        //check for top of stacks children
        //if abs(stack.pos - child.pos) < 10
        const bounds = this.getBoundingClientRect();
        const children = [...stack.querySelectorAll<RoGraphElement>('rg-stack>*')];
        let validInsertion: { el: RoGraphElement, before: boolean } | null = null;
        children.forEach((child) => {
            function dist(x1: number, y1: number, x2: number, y2: number): number {
                return Math.sqrt(
                    ((x1 - x2) * (x1 - x2)) +
                    (y1 - y2) * (y1 - y2)
                );;
            }
            const childBounds = child.getBoundingClientRect();
            const distanceTop = dist(childBounds.left, childBounds.top, bounds.left, bounds.bottom)
            const distanceBottom = dist(childBounds.left, childBounds.bottom, bounds.x, bounds.y)

            const childSVG = child.querySelector('polygon')!;
            if (distanceBottom < 10) {
                childSVG.style.fill = 'blue'
                validInsertion = {
                    el: child,
                    before: false
                }
            } else if (distanceTop < 10 && child.parentElement?.firstChild == child) {
                childSVG.style.fill = 'green'
                validInsertion = {
                    el: child,
                    before: true
                }
            } else {
                childSVG.style.fill = 'red'
            }
        })
        return validInsertion;
    }

    /**
     * forces the stack to attach to mouse
     */
    attach() {
        this.attached = true;
    }

    /**
     * forces the stack to detach from mouse
     */
    detach() {
        this.attached = false;
    }

}

registerComponent(RoGraphStack);