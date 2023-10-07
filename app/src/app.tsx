import { createRoot } from 'react-dom/client';


const App = () => {
  return (
    <div>
      <h2>Hello from React!</h2>
      <button id="btnOpen" onClick={openFile}>Open</button>
      <footer className="footer"></footer>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)


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

