import { app } from "electron";
import path from 'path';

export default{
    language: "en_US",
    sketchbook: path.resolve(app.getPath('documents'), 'RoGraph2/sketchbook'),
    libraries: path.resolve(app.getPath('documents'), 'Arduino/libraries')
}