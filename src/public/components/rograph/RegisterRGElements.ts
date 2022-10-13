import { registerComponent } from "./RoGraphElement";
import { RoGraphStackBlock } from "./blocks/RoGraphStackBlock";
import { RoGraphWrapBlock } from "./blocks/RoGraphWrapBlock";
import { RoGraphCanvas } from "./RoGraphCanvas";
import { RoGraphContentSlot } from "./RoGraphContentSlot";
import { RoGraphScope } from "./RoGraphScope";
import { RoGraphStack } from "./RoGraphStack";

export default function(){
    console.log('RG');
    
    registerComponent(RoGraphStackBlock);
    registerComponent(RoGraphWrapBlock);
    registerComponent(RoGraphCanvas);
    registerComponent(RoGraphContentSlot);
    registerComponent(RoGraphScope);
    registerComponent(RoGraphStack);
}