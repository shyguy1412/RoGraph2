import { CustomElement } from "./CustomElement";

export abstract class Menu extends CustomElement {

    html(): string {
        return /*html*/`
        <div class="menu">${this.menuHtml()}</div>
        `
    }

    abstract menuHtml():string;

    attach(button: HTMLElement) {
        
        const observer = new MutationObserver(() => {
            this.style.display = button.classList.contains('selected')
                ? 'block'
                : 'none';
        });
        observer.observe(button, {
            childList: false,
            characterData: false,
            attributes: true,
            subtree: false
            
        })

        this.style.display = button.classList.contains('selected')
        ? 'block'
        : 'none';
    }

}