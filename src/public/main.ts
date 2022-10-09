import { RoGraphStackBlock } from '@rograph/blocks/RoGraphStackBlock';
import { RoGraphWrapBlock } from '@rograph/blocks/RoGraphWrapBlock';
import { RoGraphCanvas } from '@rograph/RoGraphCanvas';
import { RoGraphStack } from '@rograph/RoGraphStack';
import RegisterUI from '@ui/RegisterUI';
import { RoGraphMenu } from '@ui/RographMenu';
import { SettingsDialog } from './components/ui/SettingsDialog';

RegisterUI();
//get reference to app root
const app = document.querySelector('#app')!;

const canvas = RoGraphCanvas.create()

const menu = RoGraphMenu.create();

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
