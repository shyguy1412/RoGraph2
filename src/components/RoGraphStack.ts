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

    private attached = false;

    init(): void {
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

        //event listeners for mouse interaction
        this.addEventListener('mousedown', (e) => {
            switch (e.button) {
                case 0:
                    this.pickUpStack(e);
                    break;
                default:
            }
        })

        //add global listener for mouse up. this prevents the stack getting stuck when the
        //mousebutton is released while the cursor isnt over it
        document.addEventListener('mouseup', (e) => {
            switch (e.button) {
                case 0:
                    this.dropStack(e);
                    break;
                default:
            }
        })

        document.addEventListener("mousemove", (e) => {
            this.followMouse(e);
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
            const element = e.composedPath().find((element) => element instanceof RoGraphStackBlock)!as Element;
            const index = Array.from(element.parentNode!.children).indexOf(element);
            const newStack = this.separateStackAt(index);
            newStack.offset.x = e.offsetX + canvas.offsetLeft;
            // newStack.offset.y = e.offsetY + canvas.offsetTop;
            newStack.attach();
            return;
        }

        this.attached = true;

        this.offset.x = e.offsetX + canvas.offsetLeft;
        this.offset.y = e.offsetY + canvas.offsetTop;

        canvas.appendChild(this);
        document.addEventListener("mousemove", (e) => {
            this.followMouse(e);
        });

    }

    dropStack(e: MouseEvent) {
        this.attached = false;
        document.removeEventListener("mousemove", (e) => {
            this.followMouse(e);
        });

        //delete stack if outside on the left
        if (this.x < 0) this.deleteStack();
    }

    followMouse(e: MouseEvent) {
        if (!this.attached) return;
        this.x = e.clientX - this.offset.x;
        this.y = e.clientY - this.offset.y;
    }

    deleteStack() {
        this.remove();
    }

    separateStackAt(at: number): RoGraphStack {
        const newStack = RoGraphStack.create() as RoGraphStack;
        const blocks: Node[] = [];
        this.childNodes.forEach((node, index) => {
            console.log(at, index);
            
            if (index >= at) {
                node.remove();
                blocks.push(node)
            };
        });
        console.log(blocks);
        
        newStack.append(...blocks);
        this.parentElement?.append(newStack);
        return newStack
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