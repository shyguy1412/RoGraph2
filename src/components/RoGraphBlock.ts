import { RoGraphStack } from "./RoGraphStack";

export interface RoGraphBlock extends HTMLElement{
    canConnectStack(stack:RoGraphStack):boolean,
    connectStack(stack:RoGraphStack):void,    
}