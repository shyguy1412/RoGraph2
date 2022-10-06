import { app } from "electron";
import path from 'path';

export default{
    language: "en_US",
    sketchbook: path.resolve(app.getPath('documents'), 'RoGraph2/Sketchbook'),
    libraries: path.resolve(app.getPath('documents'), 'Arduino/libraries'),
    extensions: path.resolve(app.getPath('documents'), 'RoGraph2/extensions')
}