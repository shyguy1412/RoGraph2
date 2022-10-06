import { app } from "electron"
import fs from 'fs';
import path from 'path';
import i18n from "./i18next.config";
import DefaultSettings from "./DefaultSettings";
type Settings = typeof DefaultSettings;

const dataPath = app.getPath('userData');
const settingsFile = path.resolve(dataPath, 'settings.json');

if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, JSON.stringify(DefaultSettings));
}

let globalSettings = loadSettingsFile();

const loadSetting: any = {
    language: loadLanguage
}

async function loadSettings() {
    const awaits: Promise<unknown>[] = [];
    const settings = await loadSettingsFile();

    Object.keys(settings).forEach((setting) => {
        if (Object.keys(loadSetting).includes(setting))
            awaits.push(loadSetting[setting](settings[<keyof Settings>setting]));
    })

    await Promise.all(awaits);
}

async function loadLanguage(language: string) {
    return i18n.changeLanguage(language);
}


function loadSettingsFile() {

    const buffer = fs.readFileSync(settingsFile);
    const settings = <Settings>JSON.parse(buffer.toString())

    return settings;
}


async function saveSettings(settings: Partial<Settings>) {

    //update settings
    Object.keys(settings).forEach(setting => {
        globalSettings[<keyof Settings>setting] = settings[<keyof Settings>setting]!;
    });

    //save updated settings
    return new Promise<void>((resolve) => {
        fs.writeFile(settingsFile, JSON.stringify(globalSettings), {}, () => {
            resolve();
        })
    });
}

export default {
    loadSettings,
    saveSettings,
    get settings() {
        return JSON.parse(JSON.stringify(globalSettings)) as Settings;
    }
}