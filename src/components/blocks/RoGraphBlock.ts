import { RoGraphStack } from "../RoGraphStack";

export interface RoGraphBlock extends HTMLElement{
    tryConnectStack(stack:RoGraphStack):void,    
}