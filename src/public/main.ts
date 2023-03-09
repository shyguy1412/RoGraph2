import RegisterRGElements from '@rograph/RegisterRGElements';
import RegisterUI from '@ui/RegisterUI';

RegisterRGElements();
RegisterUI();

const app = document.querySelector('#app')!;
// <rg-stackblock type="com.xisio.robat#action.1"></rg-stackblock>

app.innerHTML = /*html*/`
<side-menu></side-menu>
<rg-canvas>
    <rg-stack x=100 y=100>
        <rg-wrapblock type="net.nasram.rograph#logic.1">
            <rg-wrapblock slot='content0' type="net.nasram.rograph#logic.1">
            </rg-wrapblock>
        </rg-wrapblock>
    </rg-stack>
    <rg-stack x=300 y=100>
        <rg-stackblock type="com.xisio.robat#action.1"></rg-stackblock>
    </rg-stack>
    <rg-stack x=500 y=100>
        <rg-valueblock type="com.xisio.robat#sensor.0"></rg-valueblock>
        <rg-valueblock type="com.xisio.robat#sensor.0"></rg-valueblock>
        <rg-valueblock type="com.xisio.robat#sensor.0"></rg-valueblock>
        <rg-valueblock type="com.xisio.robat#sensor.0"></rg-valueblock>
    </rg-stack>
    </rg-canvas>
    `;
    
IPC.onMessage('open-settings', () => {
  app.innerHTML += /*html*/`<settings-dialog></settings-dialog>`
});

IPC.onMessage('set-language', (_e, lang) => {
  i18n.setLanguage(lang);
});

IPC.onMessage('load-extension', (_e, extension) => {
  console.log(extension);
});
