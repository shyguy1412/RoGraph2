import { CustomElement, registerComponent } from "./CustomElement";

export class SettingsDialog extends CustomElement {

    constructor() {
        super();
    }

    html() {
        return /* html */`
        <div class="settings">
            <div class="settings-title">
                <div>${i18n.t('Settings')}</div>
                <i id="close-button" class="fa fa-close"></i>
            </div>
            <div class="settings-content">
                <select name="language-select" id="language-select">
                ${function () {
                return i18n.languages.reduce((prev, cur) => {
                    const name = i18n.t('name', 'meta', cur);
                    console.log(name, cur);

                    const nativeName = i18n.t('native_name', 'meta', cur);
                    return prev + /* html */`
                            <option ${cur == i18n.currentLanguage() ? 'selected' : ''} value="${cur}">
                            ${name} (${nativeName})
                            </option>
                            `
                }, "")
            }()}
                </select>
            </div>
            <div class="settings-control">
                <button id="cancel-button">${i18n.t('Cancel')}</button>
                <button id="confirm-button">${i18n.t('Confirm')}</button>
            </div>
        </div>
        `;
    }

    applyListeners() {
        this.querySelector('#close-button')?.addEventListener('click', () => {
            this.remove();
        });
        this.querySelector('#cancel-button')?.addEventListener('click', () => {
            this.remove();
        });
        this.querySelector('#confirm-button')?.addEventListener('click', async () => {
            await this.confirmSettings();
            IPC.reloadApp();
        });
    }

    async confirmSettings(){
        const promises:Promise<unknown>[] = [];

        const newLang = this.querySelector<HTMLSelectElement>('#language-select')!.value;
        if(newLang != i18n.currentLanguage()){
            IPC.changeLanguage(newLang);
        }

        await Promise.all(promises);
    }

}