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
    n!:number;
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

    checkInsertion(stack: RoGraphStack) {
        //check for top of stacks children
        //if abs(stack.pos - child.pos) < 10
        const bounds = stack.getBoundingClientRect();
        const children = [...this.querySelectorAll<RoGraphElement>('*')]
            .filter((el) => el instanceof RoGraphElement);
        children.forEach((child) => {
            const childBounds = child.getBoundingClientRect();
            const distance = Math.sqrt(
                ((childBounds.x - bounds.x) * (childBounds.x - bounds.x)) +
                (childBounds.y - bounds.y) * (childBounds.y - bounds.y)
            );

            const childSVG = child.querySelector<SVGRectElement>('polygon')!;
            if(distance < 10){
                childSVG.style.fill = 'blue'
            } else {
                childSVG.style.fill = 'red'
            }
            
        })

        //check for bottom of stacks
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