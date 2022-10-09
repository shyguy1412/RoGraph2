import { CustomElement } from "./CustomElement";

export abstract class Menu extends CustomElement {

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