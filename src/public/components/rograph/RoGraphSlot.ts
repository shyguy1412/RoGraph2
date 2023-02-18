import { RoGraphElement } from "./RoGraphElement";
import { RoGraphScope } from "./RoGraphScope";

export abstract class RoGraphSlot extends RoGraphScope {

    pos: { x: number, y: number } = { x: 0, y: 0 };

    abstract updateClientPosition(): void;

}