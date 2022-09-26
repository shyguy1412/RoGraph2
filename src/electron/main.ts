// electron/electron.js
import * as path from 'path';
import { app, BrowserWindow, Menu, MenuItem } from 'electron';

const isDev = process.env.IS_DEV == "true" ? true : false;

function createMenu(): Menu {
   const menu = new Menu()

   menu.append(new MenuItem({
      label: 'File',
      submenu: [
         {
            label: 'New',
            accelerator: 'ctrl+n',
            click: () => { }
         },
         {
            label: 'Open',
            accelerator: 'ctrl+o',
            click: () => { }
         },
         {
            label: 'Examples',
            accelerator: 'ctrl+e',
            click: () => { }
         },
         {
            label: 'Language',
            click: () => { }
         },
         {
            label: 'Save',
            accelerator: 'ctrl+s',
            click: () => { }
         },
         {
            label: 'Save as',
            accelerator: 'ctrl+shift+s',
            click: () => { }
         },
         {
            label: 'Exit',
            click: () => { app.quit() }
         },
      ]
   }));

   menu.append(new MenuItem({
      label: 'Edit',
      submenu: [
         {
            label: 'Undo',
            accelerator: 'ctrl+z',
            click: () => { }
         },
         {
            label: 'Redo',
            accelerator: 'ctrl+y',
            click: () => { }
         },
         {
            label: 'Import functions',
            click: () => { }
         },
      ]
   }));

   menu.append(new MenuItem({
      label: 'Sketch',
      submenu: [
         {
            label: 'Build',
            accelerator: 'ctrl+r',
            click: () => {}
         },
         {
            label: 'Upload',
            accelerator: 'ctrl+u',
            click: () => {}
         },
         {
            label: 'Open console',
            click: () => {}
         },
      ]
   }));

   if (isDev || true)
      menu.append(new MenuItem({
         label: 'Dev',
         submenu: [
            {
               label: 'Toggle Developer Tools',
               accelerator: 'ctrl+shift+i',
               click: () => { BrowserWindow.getFocusedWindow()!.webContents.toggleDevTools() }
            }, {
               label: 'Reload',
               accelerator: 'f5',
               click: () => { BrowserWindow.getFocusedWindow()!.reload() }
            },
            {
               label: 'Exit',
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
