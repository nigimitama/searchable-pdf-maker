import { createWorker, PSM } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// TODO: コントラストを強めるとかOCR向けの事前処理をはさみたいところ

const concatPdfs = async (pdfPaths: string[], outputPath: string) => {
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
  const { data: { text, pdf } } = await worker.recognize(inputPath, { pdfTitle: outputPath }, { pdf: true });
  console.log(`[imageToPdf] ${text}`)
  fs.writeFileSync(outputPath, Buffer.from(pdf));
  await worker.terminate();
  return true
}

// 複数の画像にOCRをかけてpdfにする
export const imagesToPdf = async (imagePaths: string[], outputPdfPath: string, langCodes: string) => {
  console.log(`[imagesToPdf] imagePaths=${imagePaths} outputPdfPath=${outputPdfPath} langCodes=${langCodes}`)

  let tempPdfPath
  const results: boolean[] = []
  const tempPdfPaths: string[] = []
  const tmpdir: string = os.tmpdir()
  for (const imagePath of imagePaths) {
    tempPdfPath = path.join(tmpdir, `${path.basename(imagePath)}.pdf`)
    results.push(await imageToPdf(imagePath, tempPdfPath, langCodes))
    tempPdfPaths.push(tempPdfPath)
  }
  await concatPdfs(tempPdfPaths, outputPdfPath)
  console.log(`[imagesToPdf] ${outputPdfPath} created`)
  
  const isSuccess = results.every((value) => value == true)
  console.log(`[imagesToPdf] isSuccess=${isSuccess}`)
  return isSuccess
}
