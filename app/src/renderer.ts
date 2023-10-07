/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import './app';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const func = async () => {
  // FIXME: rendererが動くときはまだDOMが変わってない
  let b = await document.querySelector("#btnOpen")
  console.log(b)

  document.querySelector("#btnOpen").addEventListener("click", () => {
    openFile();
  });
}

func()

async function openFile() {
  let currentPath = null;
  const result = await window.myApp.openFile();

  if (result) {
    const { filePath, textData } = result;

    // フッター部分に読み込み先のパスを設定する
    const footerArea = document.querySelector(".footer");
    footerArea.textContent = currentPath = filePath;
    // テキスト入力エリアに設定する
    editor.setValue(textData, -1);
  }
}


// ---------------------------------------
// ドラッグ&ドロップ関連処理（任意実装）
// ---------------------------------------

// dropはdragoverイベントを登録していてはじめて発火するため指定
document.addEventListener("dragover", (event) => {
  event.preventDefault();
});
// ドロップされたらそのファイルを読み込む
document.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];

  // FileReader 機能を使って読み込み。
  // メインプロセス側で処理を統一してもいいかもですが、代案として例示します。
  const reader = new FileReader();
  reader.onload = function () {
    const textData = reader.result;

    // フッター部分に読み込み先のパスを設定する
    footerArea.textContent = currentPath = file.path;
    // テキスト入力エリアに設定する
    editor.setValue(textData, -1);
  };
  reader.readAsText(file); // テキストとして読み込み
});