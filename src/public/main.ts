import { RoGraphCanvas } from './components/RoGraphCanvas';
import {RoGraphMenu} from './components/RoGraphMenu';
import { RoGraphStack } from './components/RoGraphStack';
import { RoGraphStackBlock } from './components/blocks/RoGraphStackBlock';
import { RoGraphWrapBlock } from './components/blocks/RoGraphWrapBlock';

//get reference to app root
const app = document.querySelector('#app')!;

const menu = RoGraphMenu.create()
const canvas = RoGraphCanvas.create()

//create app structure
app.appendChild(menu);
app.appendChild(canvas);

const stack = RoGraphStack.create<RoGraphStack>();

canvas.append(stack);

stack.append(RoGraphStackBlock.create());
stack.append(RoGraphStackBlock.create());
stack.append(RoGraphStackBlock.create());

stack.x = 150;
stack.y = 100;

// const stack2 = RoGraphStack.create<RoGraphStack>();

// canvas.append(stack2);

// stack2.append(RoGraphWrapBlock.create());
// // stack2.append(RoGraphWrapBlock.create());

// stack2.x = 150;
// stack2.y = 300;


console.log('new start');
