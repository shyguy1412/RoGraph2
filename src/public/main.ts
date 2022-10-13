import RegisterRGElements from '@rograph/RegisterRGElements';
import RegisterUI from '@ui/RegisterUI';

RegisterRGElements();
RegisterUI();

const app = document.querySelector('#app')!;

app.innerHTML = /*html*/`
<side-menu></side-menu>
<rg-canvas>
  <rg-stack>
    <rg-stackblock></rg-stackblock>
  </rg-stack>
</rg-canvas>
`

IPC.onMessage('open-settings', () => {
  app.innerHTML += /*html*/`<settings-dialog></settings-dialog>`
});

IPC.onMessage('set-language', (_e, lang) => {
  i18n.setLanguage(lang);
});

IPC.onMessage('load-extension', (_e, extension) => {
  console.log(extension);
});
