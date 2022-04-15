import { registerComponent, RoGraphElement } from './RoGraphElement';
import { RoGraphStack } from './RoGraphStack';

export class RoGraphCanvas extends RoGraphElement {

    init(): void {
        //event listeners for mouse interaction
        this.addEventListener('mousedown', (e) => {
            const stack = e.composedPath().find((element) => element instanceof RoGraphStack)! as RoGraphStack;
            if (!stack) return;
            switch (e.button) {
                case 0:
                    stack.pickUpStack(e);
                    break;
                default:
            }
        })

        //add global listener for mouse up. this prevents the stack getting stuck when the
        //mousebutton is released while the cursor isnt over it
        document.addEventListener('mouseup', (e) => {
            const stacks = this.querySelectorAll('rg-stack') as NodeListOf<RoGraphStack>;
            stacks.forEach((stack) => {
                if (!stack || !stack.attached) return;
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

            //get stack that is being moved
            const stack = e.composedPath().find((element) => element instanceof RoGraphStack)! as RoGraphStack;
            if (stack)
            stacks.forEach((otherStack) => {
                    if (stack == otherStack) return;
                    stack.checkInsertion(otherStack);
                })
        });

    }
}

registerComponent(RoGraphCanvas);