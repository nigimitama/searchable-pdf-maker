
import { useContext } from 'react';
import { appContext } from '../app'
import { Button } from '@mui/material';


export const ExecuteButton = () => {
  const context = useContext(appContext)

  const convertImagesToPdf = async () => {
    const langCodes = context.languageCodes.join('+')
    console.log(`[convertImagesToPdf] langCodes=${langCodes}`)
    await window.myAPI.imagesToPdf(context.inputPaths, context.outputPath, langCodes)
  }

  return (
    <div>
      <Button variant='contained' size='small' onClick={convertImagesToPdf}>Create PDF</Button>
    </div>
  )
}