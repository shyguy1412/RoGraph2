import { RoGraphElement } from "./RoGraphElement";
import { RoGraphScope } from "./RoGraphScope";

export abstract class RoGraphSlot extends RoGraphScope {

    pos: { x: number, y: number } | null = null;

    abstract updateClientPosition():void;

}