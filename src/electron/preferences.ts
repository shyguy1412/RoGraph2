import { app } from "electron"
import fs from 'fs';
import path from 'path';
import i18n from "./i18next.config";

const dataPath = app.getPath('userData');
const settingsFile = path.resolve(dataPath, 'settings.json');

interface Settings{
    language?: string
}

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


async function loadSettingsFile() {
    if (!fs.existsSync(settingsFile)) {
        const defaults = await import('./DefaultSettings') as Settings;
        saveSettingsFile({...defaults});
        return defaults;
    }

    const settings = new Promise<Settings>((resolve) => {
        fs.readFile(settingsFile, {}, (_e, data) => {
            try {
                resolve(<Settings>JSON.parse(data.toString()));
            } catch (e) {
                console.error(e);
            }
        })
    });

    return settings;
}


async function saveSettingsFile(settings: Settings) {
    //load current settings
    const currentSettings = await loadSettingsFile();

    //update settings
    Object.keys(settings).forEach(setting => {
        currentSettings[<keyof Settings>setting] = settings[<keyof Settings>setting];
    });

    //save updated settings
    return new Promise<void>((resolve) => {
        fs.writeFile(settingsFile, JSON.stringify(settings), {}, () => {
            resolve();
        })
    });
}

export default {
    loadSettings,
    saveSettings: saveSettingsFile,
}