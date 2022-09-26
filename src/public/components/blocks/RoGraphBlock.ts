import { dist } from "../../assets/functions";
import { RoGraphElement } from "../RoGraphElement";
import { RoGraphStack } from "../RoGraphStack";

export class RoGraphBlockSocket {
    constructor(parent: RoGraphBlock, pos: { x: number, y: number }) {

    }
}

export class RoGraphBlockPlug {
    constructor(parent: RoGraphBlock, pos: { x: number, y: number }) {

    }

    canConnect(socket:RoGraphBlockSocket){
        return false;
    }
}

export class RoGraphBlock extends RoGraphElement {
    socket: RoGraphBlockSocket;
    plugs: RoGraphBlockPlug[];

    constructor() {
        super();
        this.socket = new RoGraphBlockSocket(this, this.getBoundingClientRect());
        this.plugs = [new RoGraphBlockPlug(this, {
            x: this.getBoundingClientRect().left,
            y: this.getBoundingClientRect().bottom,
        })]

    }

    canConnectStack(stack: RoGraphStack): boolean {
        let result = false;
        const sockets = [...stack.querySelectorAll<RoGraphBlock>('rg-stack .rg-block')].map((value) => value.socket);
        
        outer: for(const plug of this.plugs){
            for(const socket of sockets){
                if(plug.canConnect(socket)){
                    result = true;
                    break outer;
                }
            }
        }

        return result;
    }


    connectStack(stack: RoGraphStack): boolean {
        const sockets = [...stack.querySelectorAll<RoGraphBlock>('rg-stack .rg-block')].map((value) => value.socket);
        
        outer: for(const plug of this.plugs){
            for(const socket of sockets){
                if(plug.canConnect(socket)){
                    //do the thingy
                    break outer;
                }
            }
        }
        return false;
    }
}