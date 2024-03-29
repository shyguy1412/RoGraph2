import * as path from 'path';
import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import i18n from './i18next.config';
import menuActionMap from './menu';
import { ipcMain } from 'electron/main';
import preferences from './preferences';
import ExtensionManager, { loadExtensions } from './ExtensionManager';


const isDev = process.env.IS_DEV == "true" ? true : false;

// if (isDev) require('electron-reload')(__dirname, {
//    electron: require(path.resolve(__dirname, '../../..', 'node_modules/electron'))
// });

function createMenu(): Menu {
  const menu = new Menu()

  menu.append(new MenuItem({
    label: i18n.t('File'),
    submenu: [
      {
        label: i18n.t('New'),
        accelerator: 'ctrl+n',
        click: menuActionMap['newSketch']
      },
      {
        label: i18n.t('Open') + '...',
        accelerator: 'ctrl+o',
        click: menuActionMap['openSketch']
      },
      {
        label: i18n.t('Examples'),
        accelerator: 'ctrl+e',
        click: menuActionMap['openExamples']
      },
      {
        label: i18n.t('Close'),
        click: menuActionMap['closeSketch']
      },
      {
        label: i18n.t('Save'),
        accelerator: 'ctrl+s',
        click: menuActionMap['saveSketch']
      },
      {
        label: i18n.t('Save as'),
        accelerator: 'ctrl+shift+s',
        click: menuActionMap['saveSketchAs']
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('Settings'),
        click: menuActionMap['openSettings']
      },
      {
        type: 'separator'
      },
      {
        label: i18n.t('Exit'),
        click: menuActionMap['exit']
      },
    ]
  }));

  menu.append(new MenuItem({
    label: i18n.t('Edit'),
    submenu: [
      {
        label: i18n.t('Undo'),
        accelerator: 'ctrl+z',
        click: menuActionMap['undo']
      },
      {
        label: i18n.t('Redo'),
        accelerator: 'ctrl+y',
        click: menuActionMap['redo']
      }, //TODO: copy/paste. Highlight selected scope?
    ]
  }));

  menu.append(new MenuItem({
    label: i18n.t('Sketch'),
    submenu: [
      {
        label: i18n.t('Build'),
        accelerator: 'ctrl+r',
        click: menuActionMap['buildSketch']
      },
      {
        label: i18n.t('Upload'),
        accelerator: 'ctrl+u',
        click: menuActionMap['uploadSketch']
      }, //TODO: Export binary
    ]
  }));

  //TODO:serial plotter and moniter, port selection, board selection
  menu.append(new MenuItem({
    label: i18n.t('Tools'),
    submenu: [
      {
        label: i18n.t('Install Extension') + '...',
        // accelerator: 'f',
        click: menuActionMap['installExtension']
      },
    ]
  }));


  if (isDev)
    menu.append(new MenuItem({
      label: i18n.t('Dev'),
      submenu: [
        {
          label: i18n.t('Toggle Developer Tools'),
          accelerator: 'ctrl+shift+i',
          click: () => { BrowserWindow.getFocusedWindow()!.webContents.toggleDevTools() }
        }, {
          label: i18n.t('Reload'),
          accelerator: 'f5',
          click: () => { BrowserWindow.getFocusedWindow()!.reload() }
        },
        {
          label: i18n.t('Exit'),
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
    height: height,
    minWidth: width,
    minHeight: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3001'
      : `file://${path.join(__dirname, '../src/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(async () => {

  await preferences.loadSettings();
  const mainWindow = createWindow();

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.webContents.send('set-language', i18n.language);
    loadExtensions()
      .then((extensions) => {
        // console.log(JSON.stringify(extensions));
        extensions.forEach(extension => {
          console.log(extension);

          mainWindow.webContents.send('load-extension', extension)
        })

      });
  })


  app.on('activate', function () {
    //WARN: Might be sketchy with loading of settings and stuff?
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

//TODO: combine all settings into one object that can be saved in one go
ipcMain.handle('change-language', (_e, language: string) => {
  i18n.changeLanguage(language);
  preferences.saveSettings({
    language
  })
});

i18n.on('languageChanged', () => {
  const menu = createMenu();
  Menu.setApplicationMenu(menu);
})

ipcMain.handle('soft-reload', () => {
  //TODO: save and restore sketch state
  BrowserWindow.getAllWindows().forEach(window => window.close());
  createWindow();
})