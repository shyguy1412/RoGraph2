import { RoGraphCanvas } from './components/RoGraphCanvas';
import {RoGraphMenu} from './components/RoGraphMenu';
import { RoGraphStack } from './components/RoGraphStack';
import { RoGraphStackBlock } from './components/RoGraphStackBlock';

//get reference to app root
const app = document.querySelector('#app')!;

const menu = RoGraphMenu.create()
const canvas = RoGraphCanvas.create()

//create app structure
app.appendChild(menu);
app.appendChild(canvas);

const stack = RoGraphStack.create();

canvas.append(stack);

stack.append(RoGraphStackBlock.create());
stack.append(RoGraphStackBlock.create());
stack.append(RoGraphStackBlock.create());

console.log('new start');
