import { RoGraphStackBlock } from '@rograph/blocks/RoGraphStackBlock';
import { RoGraphWrapBlock } from '@rograph/blocks/RoGraphWrapBlock';
import { RoGraphCanvas } from '@rograph/RoGraphCanvas';
import { RoGraphMenu } from '@rograph/RoGraphMenu';
import { RoGraphStack } from '@rograph/RoGraphStack';
import { SettingsDialog } from './components/ui/SettingsDialog';

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
stack.append(RoGraphStackBlock.create());
stack.append(RoGraphWrapBlock.create());

IPC.onMessage('open-settings', () => {
    app.appendChild(SettingsDialog.create());
});

IPC.onMessage('set-language', (_e, lang) => {
    i18n.setLanguage(lang);
});

IPC.onMessage('load-extension', (_e, extension) => {
    console.log(extension);
});
