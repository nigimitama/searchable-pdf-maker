import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useContext } from 'react';
import { appContext, contextValues } from '../app'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


export const DisplayInput = () => {
  const context: contextValues = useContext(appContext)
  const inputPathList = context.inputPaths.map((path: string) => {
    return (
      <ListItem disablePadding key={path}>
        <ListItemButton dense>
          <InsertDriveFileIcon />
          <ListItemText primary={path} style={{paddingLeft: '1em'}} />
        </ListItemButton>
      </ListItem>
    )
  })

  return (
    <div id='inputPathsDisplayArea' hidden>
      <p>{context.inputPaths.length} files are selected</p>
      {/* TODO: add clear button */}
      <List style={{overflowY: 'scroll', maxHeight: '200px'}}>
        {inputPathList}
      </List>
    </div>
  )
}