// functions to be registered into ipcMain
import { dialog, IpcMainInvokeEvent } from 'electron';
import { parseFilePaths, getDirPath } from './filePath';
import { imagesToPdf } from './ocr';

export const handleParseFilePaths = async (_: IpcMainInvokeEvent, inputPath: string) => {
  const filePaths = await parseFilePaths(inputPath)
  return filePaths
}

export const handleOpenDialog = async (_: IpcMainInvokeEvent, defaultPath: string) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    defaultPath: defaultPath,
    filters: [{ name: 'PDF file', extensions: ['pdf'] }]
  })

  if (canceled) {
    return null
  } else {
    return filePaths[0]
  }
}

export const handleSaveDialog = async (_: IpcMainInvokeEvent, defaultPath: string) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: defaultPath,
    filters: [{ name: 'PDF file', extensions: ['pdf'] }]
  })

  if (canceled) {
    return null
  } else {
    return filePath
  }
}

export const handleGetDirPath = async (_: IpcMainInvokeEvent, filePath: string) => {
  const dirPath = await getDirPath(filePath)
  return dirPath
}

export const handleImagesToPdf = async (_: IpcMainInvokeEvent, imagePaths: string[], outputPdfPath: string, langCodes: string) => {
  await imagesToPdf(imagePaths, outputPdfPath, langCodes)
}
