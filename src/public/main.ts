import { RoGraphCanvas } from '@components/RoGraphCanvas';
import { RoGraphMenu } from '@components/RoGraphMenu';

//get reference to app root
const app = document.querySelector('#app')!;

const menu = RoGraphMenu.create()
const canvas = RoGraphCanvas.create()

//create app structure
app.appendChild(menu);
app.appendChild(canvas);

ipcEvents.on('change-language', (_event, availableLanguages:string[]) => {
    console.log(availableLanguages);
})