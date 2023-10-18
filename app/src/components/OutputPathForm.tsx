
import { useContext } from 'react';
import { appContext } from '../app'
import { Button, Typography } from '@mui/material';


export const OutputPathForm = () => {
  const context = useContext(appContext)

  const fetchFilePath = async () => {
    const filePath = await window.myAPI.saveDialog(context.outputPath)
    context.setOutputPath(filePath)
  }

  return (
    <div>
      <Typography variant='h6'>Output Path</Typography>
      <div>
        <span style={{margin: '0 10px 0 0'}}>{context.outputPath}</span>
        <Button variant='contained' size='small' onClick={fetchFilePath}>Browser</Button>
      </div>
    </div>
  )
}