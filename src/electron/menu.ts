import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { availableLanguages } from "./i18next.config";

function newFile() {
    throw new Error("Function not implemented.");
}


function openFile() {
    throw new Error("Function not implemented.");
}


function openExamples() {
    throw new Error("Function not implemented.");
}


function changeLanguage() {
    BrowserWindow.getFocusedWindow()?.webContents.send('change-language', availableLanguages);
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
    newFile,
    openFile,
    openExamples,
    changeLanguage,
    saveSketch,
    saveSketchAs,
    undo,
    redo,
    buildSketch,
    uploadSketch,
    exit,
};