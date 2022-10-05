import { app, BrowserWindow } from "electron";
import { availableLanguages } from "./i18next.config";

function newSketch() {
    throw new Error("Function not implemented.");
}


function openSketch() {
    throw new Error("Function not implemented.");
}

function closeSketch() {
    throw new Error("Function not implemented.");
}

function openExamples() {
    throw new Error("Function not implemented.");
}


function openSettings() {
    BrowserWindow.getFocusedWindow()?.webContents.send('open-settings', availableLanguages);
}


function saveSketch() {
    throw new Error("Function not implemented.");
}


function saveSketchAs() {
    throw new Error("Function not implemented.");
}


function undo() {
    throw new Error("Function not implemented.");
}


function redo() {
    throw new Error("Function not implemented.");
}


function buildSketch() {
    throw new Error("Function not implemented.");
}


function uploadSketch() {
    throw new Error("Function not implemented.");
}

function exit() {
    app.quit();
}

export default {
    newSketch,
    openSketch,
    closeSketch,
    openExamples,
    openSettings,
    saveSketch,
    saveSketchAs,
    undo,
    redo,
    buildSketch,
    uploadSketch,
    exit,
};