import { GeckoSVG } from "geckosvg";

export abstract class RoGraphSVG extends GeckoSVG{

    init(){
        this.style.userSelect = 'none';
        this.style.display = 'inline-block';
        this.root.style.overflow = 'visible';
        this.draw();
    }

    abstract draw():void;
    abstract updateShape():void;
    
}