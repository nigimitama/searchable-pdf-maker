import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useContext } from 'react';
import { appContext } from '../app'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const DisplayInput = () => {
  const values = useContext(appContext)
  const inputPathList = values.inputPaths.map((path: string) => {
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
      <p>{values.inputPaths.length} files are selected</p>
      <List style={{overflowY: 'scroll', height: '200px'}}>
        {inputPathList}
      </List>
    </div>
  )
}