import { loadAsync } from 'jszip';
import fs from 'fs';
import path from 'path';
import preferences from './preferences';
import { Extension } from '../shared/Extension';
import i18n from './i18next.config';
import { BlockInfo } from '../shared/BlockInfo';

let loadedExtensions:Extension[] = [];

export default {
    get extensions(){
        return JSON.parse(JSON.stringify(loadedExtensions)) as Extension[]
    }
}

export async function installExtensionFromZip(extensionPath: string) {
    if (!fs.existsSync(extensionPath)) return;

    const binary = await new Promise<Buffer>((resolve) => {
        fs.readFile(extensionPath, {}, (_e, data) => {
            resolve(data);
        })
    })

    const data = await loadAsync(binary)
        .catch((e) => {
            console.log(e);
        });


    if (data == undefined) return;

    const awaits: Promise<unknown>[] = [];

    Object.entries(data.files).forEach(async ([key, value]) => {
        if (value.dir) return;
        const buffer = await value.async('nodebuffer');

        const filePath = path.resolve(preferences.settings.extensions, value.name);

        fs.mkdirSync(path.dirname(filePath), {
            recursive: true
        });

        awaits.push(new Promise<void>((resolve) => fs.writeFile(filePath, buffer, {}, () => {
            resolve();
        })));
    })

    return Promise.all(awaits);
}

export async function loadExtensions() {
    //get all extensions
    const extensionList = await new Promise<string[]>(
        (resolve) =>
            fs.readdir(preferences.settings.extensions, { encoding: 'utf8' }, (_e, files) => resolve(files))
    );

    const awaits: Promise<unknown>[] = [];
    const extenstions: Extension[] = [];

    extensionList.forEach(extensionName => {
        awaits.push(new Promise<void>(async (resolve) => {
            const extension = await loadExtension(extensionName);
            if (extension == undefined) return;
            extenstions.push(extension);
            resolve();
        }));
    })

    await Promise.all(awaits);

    loadedExtensions = extenstions;
    return extenstions;
}

async function loadExtension(name: string) {

    const extensionPath = path.resolve(preferences.settings.extensions, name);

    //check it exists
    if (!fs.existsSync(extensionPath)) return;

    const fstat = await new Promise<fs.Stats>(
        (resolve) => {
            fs.lstat(extensionPath, (_e, data) => resolve(data));
        }
    );

    //check is directory
    if (!fstat.isDirectory) return;

    //check is package
    if (!fs.existsSync(path.resolve(extensionPath, 'package.json'))) return;

    // //load i18n
    // const languagePath = path.resolve(extensionPath, 'i18n', `${i18n.language}.json`);
    // if (fs.existsSync(languagePath)) {
    //     const resource = JSON.parse(fs.readFileSync(languagePath).toString());
    //     Object.keys(resource).forEach(ns => {
    //         i18n.addResources(i18n.language, ns, resource[ns]);
    //     })
    // };

    
    //load package.json
    const extension = await new Promise<Extension>(
        resolve => {
            fs.readFile(path.resolve(extensionPath, 'package.json'), {}, (_e, data) => {
                resolve(<Extension>JSON.parse(data.toString()));
            })
        }
    )
    
    //send blocks and package info to renderer
    const blocks = await new Promise<BlockInfo[]>(
        resolve => {
            fs.readFile(path.resolve(extensionPath, 'blocks.json'), {}, (_e, data) => {
                resolve(<BlockInfo[]>JSON.parse(data.toString()));
            })
        }
    )

    extension.blocks = blocks;

    //return package.json
    return extension;
}