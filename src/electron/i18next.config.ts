import i18n, { loadLanguages } from 'i18next';
import fs from 'fs';
import path from 'path';

const i18nPath = path.resolve(__dirname, '../i18n');

function getAvailableLanguages() {
    const langFiles = fs.readdirSync(i18nPath)
        .map(file => file.split('.')[0]);
    return langFiles;
}

function loadLanguage(lang: string) {
    const languagePath = path.resolve(i18nPath, `${lang}.json`);
    if (!fs.existsSync(languagePath)) return;
    const resource = JSON.parse(fs.readFileSync(languagePath).toString());
    Object.keys(resource).forEach(ns => {
        i18n.addResources(lang, ns, resource[ns]);
    })
}

i18n.on('languageChanged', (lang) => {
    if (i18n.getDataByLanguage(lang) == undefined) {
        loadLanguage(lang);
    }
})

i18n.init({
    lng: 'en_US',
    fallbackLng: 'en_US',
    ns: [
        'menu'
    ]
});

loadLanguage('en_US');

export const availableLanguages = getAvailableLanguages();
export default i18n;
