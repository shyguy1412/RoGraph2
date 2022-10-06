import {loadAsync} from 'jszip';
import fs from 'fs';
import path from 'path';
import preferences from './preferences';

export async function installExtensionFromZip(extensionPath:string){
    if(!fs.existsSync(extensionPath))return;

    const binary = await new Promise<Buffer>((resolve) => {
        fs.readFile(extensionPath, {}, (_e, data) => {
            resolve(data);
        })
    })

    const data = await loadAsync(binary)
    .catch((e) => {
        console.log(e);
    });

    
    if(data == undefined)return;
    
    const awaits:Promise<unknown>[] = [];

    Object.entries(data.files).forEach(async ([key, value]) => {
        if(value.dir)return;
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