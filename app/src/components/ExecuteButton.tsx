
import { useContext, useState } from 'react';
import { appContext } from '../app'
import { Button, CircularProgress } from '@mui/material';


export const ExecuteButton = () => {
  const [isRunning, setIsRunning] = useState(false)
  const context = useContext(appContext)

  const convertImagesToPdf = async () => {
    // validate
    const isEmpty = context.inputPaths.length == 0
    if (isEmpty) {
      document.getElementById('resultMessage').innerText = 'Error: empty input'
      return
    }

    // change view
    setIsRunning(true)
    document.getElementById('spinner').hidden = false

    // processing
    const langCodes = context.languageCodes.join('+')
    console.log(`[convertImagesToPdf] langCodes=${langCodes}`)
    const isSuccess = await window.myAPI.imagesToPdf(context.inputPaths, context.outputPath, langCodes)
    console.log(`[convertImagesToPdf] isSuccess=${isSuccess}`)
    const resultMessage = isSuccess ? 'The PDF is successfully created' : 'Error'

    // change view
    setIsRunning(false)
    document.getElementById('spinner').hidden = true
    document.getElementById('resultMessage').innerText = resultMessage
  }

  return (
    <div>
      <Button id='executeButton' variant='contained' size='small' disabled={isRunning} onClick={convertImagesToPdf}>Create PDF</Button>
      <div style={{margin: '10px'}}>
        <span id='spinner' hidden><CircularProgress /></span>
        <p id='resultMessage'></p>
      </div>
    </div>
  )
}
