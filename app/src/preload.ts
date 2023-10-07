// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

// レンダラープロセスのグローバル空間(window)にAPIとしての関数を生やします。
// レンダラープロセスとメインプロセスの橋渡しを行います。
contextBridge.exposeInMainWorld("myApp", {
  /**
   * @returns {Promise<{filePath: string, textData:string}>}
   */
  async openFile() {
    // メインプロセスの関数を呼び出す
    const result = await ipcRenderer.invoke("openFile");
    return result;
  }
});