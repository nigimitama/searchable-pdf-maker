
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { appContext, contextValues } from '../app'
import { Button, CircularProgress } from '@mui/material';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number },
) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


// Arrayをsize個ずつに分割する
const eachSlice = (array: Array<any>, size = 10): Array<Array<any>> => {
  if (size <= 0) throw new Error('size must be > 1')

  const n = array.length
  let i = 0
  const result = []
  while (i < n) {
    result.push(array.slice(i, i + size))
    i += size
  }
  return result
}


const imagesToPdf = async (
  inputPaths: string[],
  outputPath: string,
  langCodes: string,
  setProgress: React.Dispatch<SetStateAction<number>>,
  concurrency = 10
) => {
  const start = Date.now()
  const pathsArray = eachSlice(inputPaths, concurrency) // progressの表示のために分割
  const tempPdfPaths: string[] = []
  let isSuccess
  let result
  try {
    const m = pathsArray.length
    for (let i = 0; i < m; i++) {
      result = await window.myAPI.imagesToPdfs(pathsArray[i], langCodes)
      tempPdfPaths.push(...result.pdfPaths)
      setProgress((i + 1) / m * 100)
      console.log(`${i+1}/${m} (${(i + 1) / m * 100})`)
    }
    await window.myAPI.concatPdfs(tempPdfPaths, outputPath)
    isSuccess = true
  } catch {
    isSuccess = false
  }
  console.log(`[imagesToPdf] isSuccess=${isSuccess}`)
  const resultMessage = isSuccess ? 'The PDF is successfully created' : 'Error'

  const elapsed_ms = Date.now() - start
  console.log(`[imagesToPdf] seconds elapsed = ${Math.floor(elapsed_ms / 1000)}`)
  return resultMessage
}


export const ExecuteButton = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(true)
  const [progress, setProgress] = useState(0)
  
  const context: contextValues = useContext(appContext)

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
    const resultMessage = await imagesToPdf(context.inputPaths, context.outputPath, langCodes, setProgress) 

    // change view
    setIsRunning(false)
    document.getElementById('spinner').hidden = true
    document.getElementById('resultMessage').innerText = resultMessage
  }

  useEffect(() => {
    setIsInputEmpty(context.inputPaths.length === 0)
  })

  return (
    <div id="executeButtonArea">
      <Button id='executeButton' variant='contained' size='small' disabled={isRunning || isInputEmpty} onClick={convertImagesToPdf}>Create PDF</Button>
      <div style={{margin: '10px'}}>
        <span id='spinner' hidden>
          <CircularProgressWithLabel value={progress} />
        </span>
        <p id='resultMessage'></p>
      </div>
    </div>
  )
}
