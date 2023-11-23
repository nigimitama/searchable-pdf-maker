import { useContext, DragEvent, Dispatch, SetStateAction } from 'react';
import { appContext, contextValues } from '../app'

// dropはdragoverイベントを登録していてはじめて発火するため指定
const fillDragOver = (event: DragEvent<HTMLDivElement>) => {
  event.preventDefault();
}

// ドロップされたらそのファイルのパスを読み込む
const readFile = async (event: DragEvent<HTMLDivElement>,
                        setInputPaths: Dispatch<SetStateAction<string[]>>,
                        setOutputPath: Dispatch<SetStateAction<string>>) => {
  event.preventDefault()
  let paths: Array<string> = []
  for (const file of event.dataTransfer.files) {
    const filePaths = await window.myAPI.parseFilePaths(file.path)
    paths = paths.concat(filePaths)
  }
  setInputPaths(paths)

  // 表示切り替え
  document.getElementById('dropArea').hidden = true
  document.getElementById('inputPathsDisplayArea').hidden = false

  // set default save path
  const inputDir = await window.myAPI.getDirPath(paths[0])
  setOutputPath(`${inputDir}.pdf`)
}


export const DropArea = () => {
  const context: contextValues = useContext(appContext)
  return (
    <div
      id='dropArea'
      style={{
        border: 'dashed', borderWidth: '1px', borderColor: 'gray',
        backgroundColor: 'whitesmoke', padding: 100,
      }}
      onDragOver={fillDragOver}
      onDrop={(event) => { readFile(event, context.setInputPaths, context.setOutputPath) }}
    >
      <p style={{ background: 'white', padding: 10, margin: 0 }}>Drop Files Here (.jpg/.png/.gif)</p>
    </div>
  )
}