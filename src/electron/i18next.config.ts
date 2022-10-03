import i18n from 'i18next';
import fs from 'fs';
import path from 'path';

// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function

const en = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../i18n/', 'en_US.json')).toString());


i18n.init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    ns: [
        'menu'
    ],
    resources: {
        en: { ...en }
    }
});

i18n.on('languageChanged', (lang) => {
    if(i18n.getDataByLanguage(lang) == undefined){
        const languagePath = path.resolve(__dirname, '../i18n/', `${lang}.json`)
        console.log(languagePath);
        
        if(!fs.existsSync(languagePath)) return;
        const resource = JSON.parse(fs.readFileSync(languagePath).toString());
        console.log(resource);
        
        Object.keys(resource).forEach(ns => {
            i18n.addResources(lang, ns, resource[ns]);
        })
    }
})

export default i18n;