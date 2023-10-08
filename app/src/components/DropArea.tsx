// dropはdragoverイベントを登録していてはじめて発火するため指定
const fillDragOver = (event: DragEvent) => {
  event.preventDefault();
}
// ドロップされたらそのファイルを読み込む
const readFile = (event: DragEvent) => {
  event.preventDefault();
  for (const file of event.dataTransfer.files) {
    console.log(`file.path=${file.path}`)
  }
}

export const DropArea = () => {
  return (
    <div style={{ border: 'dotted', padding: 15 }} onDragOver={fillDragOver} onDrop={readFile}>
      <span>DropDown here</span>
    </div>
  )
}