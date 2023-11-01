
import { useContext, useEffect } from 'react';
import { appContext } from '../app'
import { Button, Typography } from '@mui/material';


export const OutputPathForm = () => {
  const context = useContext(appContext)

  const fetchFilePath = async () => {
    const filePath = await window.myAPI.saveDialog(context.outputPath)
    if (filePath) context.setOutputPath(filePath)
  }

  useEffect(() => {
    const hasInput = context.inputPaths.length > 0
    document.getElementById('OutputPathForm').hidden = !hasInput
  })

  return (
    <div id="OutputPathForm" hidden>
      <Typography variant='h6'>Output Path</Typography>
      <span style={{margin: '0 10px 0 0'}}>{context.outputPath}</span>
      <Button variant='contained' size='small' onClick={fetchFilePath}>Browser</Button>
    </div>
  )
}