import { BlockMenu } from "./BlockMenu";
import { registerComponent } from "./CustomElement";
import { ExtensionMenu } from "./ExtensionMenu";
import { LibraryMenu } from "./LibraryMenu";
import { TabBar } from "./TabBar";
import { SideMenu } from "./SideMenu";
import { SettingsDialog } from "./SettingsDialog";
import { SketchbookMenu } from "./SketchbookMenu";

export default function () {
    registerComponent(SettingsDialog);
    registerComponent(SideMenu);
    registerComponent(BlockMenu);
    registerComponent(ExtensionMenu);
    registerComponent(LibraryMenu);
    registerComponent(SketchbookMenu);
    registerComponent(TabBar);
}