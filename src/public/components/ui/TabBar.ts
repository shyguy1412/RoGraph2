import { CustomElement } from "./CustomElement";

export class TabBar extends CustomElement {

    get activeMenu(){
        return this.shadowRoot!.querySelector('.selected');
    }

    html(): string {
        return /*html*/`
        <div class="menu-buttons">
            <div class="menu-icon" id="block-icon"><i class="fa-solid fa-trowel-bricks"></i></div>
            <div class="menu-icon" id="sketchbook-icon"><i class="fa-regular fa-folder-open"></i></div>
            <div class="menu-icon" id="extension-icon"><i class="fa-solid fa-puzzle-piece"></i></div>
        </div>
        `
    }
    applyListeners(): void {
        this.shadowRoot!.querySelectorAll('.menu-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                [...this.shadowRoot!.querySelectorAll('.menu-icon')]
                    .filter((el) => el != icon)
                    .forEach(icon => icon.classList.remove('selected'));
                icon.classList.toggle('selected');
            })
        })
    }
}