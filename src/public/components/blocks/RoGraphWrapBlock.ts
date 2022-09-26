import { registerComponent } from "@components/RoGraphElement";
import { WrapBlockSVG } from "@svg/WrapBlockSVG";
import { GeckoSVG } from "geckosvg";
import { RoGraphBlock, RoGraphBlockConnector } from "./RoGraphBlock";


export class RoGraphWrapBlock extends RoGraphBlock {

    defineConnectors(): RoGraphBlockConnector[] {
        const self = this;
        const pos = {
            x: 0,
            get y() {
                return self.getBoundingClientRect().height
            },
        };

        return [
            new RoGraphBlockConnector(this, pos)
        ]
    }

    defineSVG(): GeckoSVG {
        return WrapBlockSVG.create();
    }

    init(): void {
        super.init();

        // this.appendChild(document.createElement('div'));
        // this.content.classList.add('wrap-content');

        // const observer = new MutationObserver((mutations) => {
        //     console.log([...this.content.children].reduce((previous, next) => {
        //         console.log(next);

        //         return previous += next.getBoundingClientRect().width;
        //     }, 0));

        //     const bounds = this.content.getBoundingClientRect();
        //     this.svg.contentHeight = bounds.height;
        //     this.svg.updateShape();
        // });

        // observer.observe(this.content, { childList: true })
    }

}


registerComponent(RoGraphWrapBlock);
// registerComponent(RoGraphWrapBlockContent);