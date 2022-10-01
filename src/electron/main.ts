import * as path from 'path';
import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import i18n from './i18next.config';

const isDev = process.env.IS_DEV == "true" ? true : false;

function createMenu(): Menu {
   const menu = new Menu()

   menu.append(new MenuItem({
      label: i18n.t('fileMenu'),
      submenu: [
         {
            label: i18n.t('fileMenuNewOption'),
            accelerator: 'ctrl+n',
            click: () => { }
         },
         {
            label: i18n.t('fileMenuOpenOption'),
            accelerator: 'ctrl+o',
            click: () => { }
         },
         {
            label: i18n.t('fileMenuExamplesOption'),
            accelerator: 'ctrl+e',
            click: () => { }
         },
         {
            label: i18n.t('fileMenuLanguageOption'),
            click: () => { openChangeLanguageDialog() }
         },
         {
            label: i18n.t('fileMenuSaveOption'),
            accelerator: 'ctrl+s',
            click: () => { }
         },
         {
            label: i18n.t('fileMenuSaveAsOption'),
            accelerator: 'ctrl+shift+s',
            click: () => { }
         },
         {
            label: i18n.t('fileMenuExitOption'),
            click: () => { app.quit() }
         },
      ]
   }));

   menu.append(new MenuItem({
      label: i18n.t('editMenu'),
      submenu: [
         {
            label: i18n.t('editMenuUndoOption'),
            accelerator: 'ctrl+z',
            click: () => { }
         },
         {
            label: i18n.t('editMenuRedoOption'),
            accelerator: 'ctrl+y',
            click: () => { }
         },
      ]
   }));

   menu.append(new MenuItem({
      label: i18n.t('sketchMenu'),
      submenu: [
         {
            label: i18n.t('sketchMenuBuildOption'),
            accelerator: 'ctrl+r',
            click: () => { }
         },
         {
            label: i18n.t('sketchMenuUploadOption'),
            accelerator: 'ctrl+u',
            click: () => { }
         },
      ]
   }));

   if (isDev)
      menu.append(new MenuItem({
         label: i18n.t('devMenu'),
         submenu: [
            {
               label: i18n.t('devMenuDevToolsOption'),
               accelerator: 'ctrl+shift+i',
               click: () => { BrowserWindow.getFocusedWindow()!.webContents.toggleDevTools() }
            }, {
               label: i18n.t('devMenuReloadOption'),
               accelerator: 'f5',
               click: () => { BrowserWindow.getFocusedWindow()!.reload() }
            },
            {
               label: i18n.t('devMenuExitOption'),
               accelerator: 'esc',
               click: () => { app.quit() }
            },
         ]
      }));

   return menu;
}

function createWindow() {
   // Create the browser window.
   const width = 900;
   const height = 700;
   const mainWindow = new BrowserWindow({
      width: isDev ? width + 400 : 0,
      height: 0,
      minWidth: width,
      minHeight: height,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         nodeIntegration: true,
      },
   });

   const menu = createMenu();

   Menu.setApplicationMenu(menu);

   // and load the index.html of the app.
   // win.loadFile("index.html");
   mainWindow.loadURL(
      isDev
         ? 'http://localhost:3000'
         : `file://${path.join(__dirname, '../src/index.html')}`
   );
   // Open the DevTools.
   if (isDev) {
      mainWindow.webContents.openDevTools();
   }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   createWindow()
   
   app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
   })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

//for now just load english
function openChangeLanguageDialog() {
   i18n.changeLanguage('de_DE');

   BrowserWindow.getAllWindows().forEach(window => window.close());
   createWindow();
}

