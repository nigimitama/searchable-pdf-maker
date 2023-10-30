import { createWorker, PSM } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// TODO: コントラストを強めるとかOCR向けの事前処理をはさみたいところ

export const concatPdfs = async (pdfPaths: string[], outputPath: string) => {
  const mainPdfDoc = await PDFDocument.create()
  for (const path of pdfPaths) {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(path))
    const [existingPage] = await mainPdfDoc.copyPages(pdfDoc, [0])
    mainPdfDoc.addPage(existingPage)
  }

  const pdfBytes = await mainPdfDoc.save()
  fs.writeFileSync(outputPath, pdfBytes)
}


// 1枚の画像にOCRをかけてpdfにする
const imageToPdf = async (inputPath: string, outputPath: string, langCodes: string) => {
  console.log(`[imageToPdf] inputPath=${inputPath} outputPath=${outputPath} langCodes=${langCodes}`)
  const worker = await createWorker(langCodes);
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    // user_defined_dpi: '300'
  });
  const result = await worker.recognize(inputPath, { pdfTitle: outputPath }, { pdf: true });
  fs.writeFileSync(outputPath, Buffer.from(result.data.pdf));
  await worker.terminate();
  return true
}


interface ocrResults {
  isSuccess: boolean,
  pdfPaths: string[]
}

// 複数の画像をそれぞれpdfにする
export const imagesToPdfs = async (imagePaths: string[], langCodes: string): Promise<ocrResults> => {
  console.log(`[imagesToPdfs] imagePaths=${imagePaths} langCodes=${langCodes}`)
  const start = Date.now()

  // 出力先を設定
  const tmpdir: string = os.tmpdir()
  const tempPdfPaths: string[] = imagePaths.map((imagePath) => path.join(tmpdir, `${path.basename(imagePath)}.pdf`))

  // 結果格納用のオブジェクト
  const result: ocrResults = {
    isSuccess: null,
    pdfPaths: []
  }
  // タスクをArrayに格納
  const promises: Promise<boolean>[] = []
  for (let i=0; i < imagePaths.length; i++) {
    promises.push(imageToPdf(imagePaths[i], tempPdfPaths[i], langCodes))
  }
  // 並行的に処理
  await Promise.all(promises)
  .then(async (results) => {
    const isSuccess = results.every((value) => value == true)
    result['isSuccess'] = isSuccess
    result['pdfPaths'] = tempPdfPaths
  })
  const elapsed_ms = Date.now() - start;
  console.log(`[imagesToPdf] seconds elapsed = ${Math.floor(elapsed_ms / 1000)}`)
  return result
}
