const { createWorker, OEM, PSM } = require('tesseract.js');
const path = require('path');
const fs = require('fs');

// コントラストを強めるとかOCR向けの事前処理をはさみたいところ

(async () => {
  const worker = await createWorker({
    langPath: 'https://tessdata.projectnaptha.com/4.0.0_fast'
  });
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    user_defined_dpi: '300'
  });
  // const fileName = 'toc-h.jpg'
  const fileName = 'bom.png'
  const imagePath = `images/${fileName}`
  const { data: { text, pdf } } = await worker.recognize(imagePath, {pdfTitle: fileName}, {pdf: true});
  console.log(text);
  fs.writeFileSync(`${fileName}.pdf`, Buffer.from(pdf));
  await worker.terminate();
})();
