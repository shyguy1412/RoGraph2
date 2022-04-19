import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphStack } from './RoGraphStack';

export class RoGraphCanvas extends RoGraphElement {

    init(): void {
        //event listeners for mouse interaction
        this.addEventListener('mousedown', (e) => {
            if (e.button) return;
            //find clicked element
            const target = e.composedPath().find(el => el instanceof RoGraphElement) as RoGraphElement;
            console.log(target);

            //if clicked element is the head of a stack, pick up the stack
            if (!target.previousSibling && target.parentElement instanceof RoGraphStack)
                target.parentElement.pickUpStack(e);

            //else, get element and all it's siblings to create new stack
            else this.createNewStack(target).attach(e);
            // const stack = e.composedPath().find((element) => element instanceof RoGraphStack)! as RoGraphStack;
            // if (!stack) return;
            // switch (e.button) {
            //     case 0:
            //         stack.pickUpStack(e);
            //         break;
            //     default:
            // }
        })

        //add global listener for mouse up. this prevents the stack getting stuck when the
        //mousebutton is released while the cursor isnt over it
        document.addEventListener('mouseup', (e) => {
            const stacks = this.querySelectorAll('rg-stack') as NodeListOf<RoGraphStack>;
            stacks.forEach((stack) => {
                if (!stack.attached) return;
                switch (e.button) {
                    case 0:
                        stack.dropStack(e);
                        break;
                    default:
                }
            });

        })

        document.addEventListener("mousemove", (e) => {
            const stacks = this.querySelectorAll('rg-stack') as NodeListOf<RoGraphStack>;
            stacks.forEach((stack) => stack.followMouse(e));
        });

    }

    createNewStack(target: RoGraphElement): RoGraphStack {
        const stack = RoGraphStack.create<RoGraphStack>();
        const bounds = target.getBoundingClientRect();
        const canvasBounds = this.getBoundingClientRect();
        //-3 offset needed, not yet clear why
        stack.x = bounds.x - canvasBounds.x - 3;
        stack.y = bounds.y - canvasBounds.y;
        let iterator: ChildNode | null = target;
        while (iterator != null) {
            const next:ChildNode|null = iterator.nextSibling;
            stack.append(iterator);
            iterator = next;
        } 
        this.append(stack);
        return stack;
    }
}

registerComponent(RoGraphCanvas);
