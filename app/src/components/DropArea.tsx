import { useContext } from 'react';
import { appContext } from '../app'

// dropはdragoverイベントを登録していてはじめて発火するため指定
const fillDragOver = (event: DragEvent) => {
  event.preventDefault();
}

// ドロップされたらそのファイルのパスを読み込む
const readFile = async (event: DragEvent, setInputPaths: Function, setOutputPath: Function) => {
  event.preventDefault()
  console.log(`event.dataTransfer.files=${event.dataTransfer.files}`)
  let paths: Array<string> = []
  for (const file of event.dataTransfer.files) {
    console.log(`file.path=${file.path}`)
    const filePaths = await window.myAPI.parseFilePaths(file.path)
    console.log(`filePaths=${filePaths}`)
    paths = paths.concat(filePaths)
  }
  setInputPaths(paths)

  // 表示切り替え
  document.getElementById('dropArea').hidden = true
  document.getElementById('inputPathsDisplayArea').hidden = false

  const defaultPath = await window.myAPI.getDirPath(paths[0])
  setOutputPath(defaultPath)
}


export const DropArea = () => {
  const context = useContext(appContext)
  return (
    <div
      id='dropArea'
      style={{ border: 'dotted', padding: 15 }}
      onDragOver={fillDragOver}
      onDrop={(event) => { readFile(event, context.setInputPaths, context.setOutputPath) }}
    >
      <span>Drop Files Here (.jpg/.png/.gif)</span>
    </div>
  )
}