import { app, BrowserWindow, ipcMain } from 'electron';
import { handleGetDirPath, handleOpenDialog, handleSaveDialog, handleParseFilePaths, handleImagesToPdfs, handleConcatPdfs } from './modules/handlers'

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 500,
    width: 1024,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


app.on('ready', () => {
  ipcMain.handle('parseFilePaths', handleParseFilePaths)
  ipcMain.handle('openDialog', handleOpenDialog)
  ipcMain.handle('saveDialog', handleSaveDialog)
  ipcMain.handle('getDirPath', handleGetDirPath)
  ipcMain.handle('imagesToPdfs', handleImagesToPdfs)
  ipcMain.handle('concatPdfs', handleConcatPdfs)
  
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
