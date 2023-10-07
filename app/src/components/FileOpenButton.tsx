async function openFile() {
  const result = await window.myApp.openFile();

  if (result) {
    const { filePath, textData } = result;
    console.log(`filePath = ${filePath}`)
  }
}


export const FileOpenButton = () => {
  return (
    <button id="btnOpen" onClick={openFile}>Open</button>
  )
}
