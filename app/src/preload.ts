// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
  parseFilePaths: (inputPath: string) => ipcRenderer.invoke('parseFilePaths', inputPath),
  openDialog: (defaultPath: string) => ipcRenderer.invoke('openDialog', defaultPath),
  saveDialog: (defaultPath: string) => ipcRenderer.invoke('saveDialog', defaultPath),
  getDirPath: (filePath: string) => ipcRenderer.invoke('getDirPath', filePath),
})
