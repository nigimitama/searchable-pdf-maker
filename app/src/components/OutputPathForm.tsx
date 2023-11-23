
import { useContext } from 'react';
import { appContext } from '../app'
import { Button, Stack, TextField } from '@mui/material';


export const OutputPathForm = () => {
  const context = useContext(appContext)

  const fetchFilePath = async () => {
    const filePath = await window.myAPI.saveDialog(context.outputPath)
    if (filePath) context.setOutputPath(filePath)
  }

  return (
    <div id="OutputPathForm">
      <Stack spacing={1} direction="row" style={{width: "100%"}}>
        <TextField
          id="outputPathField"
          label="Output Location"
          value={context.outputPath}
          size="small"
        />
        <Button variant='contained' size='small' onClick={fetchFilePath}>Browser</Button>
      </Stack>
    </div>
  )
}