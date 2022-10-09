import { BlockMenu } from "./BlockMenu";
import { registerComponent } from "./CustomElement";
import { ExtensionMenu } from "./ExtensionMenu";
import { LibraryMenu } from "./LibraryMenu";
import { MenuBar } from "./MenuBar";
import { RoGraphMenu } from "./RographMenu";
import { SettingsDialog } from "./SettingsDialog";
import { SketchbookMenu } from "./SketchbookMenu";

export default function () {
    registerComponent(SettingsDialog);
    registerComponent(RoGraphMenu);
    registerComponent(BlockMenu);
    registerComponent(ExtensionMenu);
    registerComponent(LibraryMenu);
    registerComponent(SketchbookMenu);
    registerComponent(MenuBar);
}