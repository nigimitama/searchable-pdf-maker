
// dropはdragoverイベントを登録していてはじめて発火するため指定
const fillDragOver = (event) => {
  event.preventDefault();
}

// ドロップされたらそのファイルを読み込む
const readFile = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];

  // FileReader 機能を使って読み込み。
  // メインプロセス側で処理を統一してもいいかもですが、代案として例示します。
  const reader = new FileReader();
  reader.onload = () => {
    console.log(`file.path=${file.path}`)
  }
}

export const DropArea = () => {
  return (
    <div style={{ border: 'dotted' }} onDragOver={fillDragOver} onDrop={readFile}>
      <p>DropDown here</p>
    </div>
  )
}