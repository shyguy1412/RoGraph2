import { registerComponent } from "./RoGraphElement";
import { RoGraphStackBlock } from "./blocks/RoGraphStackBlock";
import { RoGraphWrapBlock } from "./blocks/RoGraphWrapBlock";
import { RoGraphCanvas } from "./RoGraphCanvas";
import { RoGraphContentSlot } from "./RoGraphContentSlot";
import { RoGraphStack } from "./RoGraphStack";
import { RoGraphLabel } from "./RoGraphLabel";
import { RoGraphValueSlot } from "./RoGraphValueSlot";
import { RoGraphValueBlock } from "./blocks/RoGraphValueBlock";

export default function(){
    registerComponent(RoGraphStackBlock);
    registerComponent(RoGraphValueBlock);
    registerComponent(RoGraphWrapBlock);
    registerComponent(RoGraphCanvas);
    registerComponent(RoGraphContentSlot);
    registerComponent(RoGraphStack);
    registerComponent(RoGraphLabel);
    registerComponent(RoGraphValueSlot);
}