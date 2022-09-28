import { RoGraphBlock } from '@blocks/RoGraphBlock';
import { dist } from 'assets/functions';
import { registerComponent, RoGraphElement } from './RoGraphElement';

export class RoGraphScope extends RoGraphElement {

    init(): void {
        this.classList.add('rg-scope')
    }

}

registerComponent(RoGraphScope);