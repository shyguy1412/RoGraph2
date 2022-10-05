import { RoGraphCanvas } from '@rograph/RoGraphCanvas';
import { RoGraphMenu } from '@rograph/RoGraphMenu';
import { SettingsDialog } from './components/ui/SettingsDialog';

//get reference to app root
const app = document.querySelector('#app')!;

const menu = RoGraphMenu.create()
const canvas = RoGraphCanvas.create()

//create app structure
app.appendChild(menu);
app.appendChild(canvas);

IPC.onMessage('open-settings', () => {
    app.appendChild(SettingsDialog.create());
});

IPC.onMessage('set-language', (_e, lang) => {
    i18n.setLanguage(lang);
})