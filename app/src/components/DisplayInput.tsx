import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useContext } from 'react';
import { appContext } from '../app'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const DisplayInput = () => {
  const values = useContext(appContext)
  const inputPathList = values.inputPaths.map((path: string) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={path} />
      </ListItem>
    )
  })

  return (
    <div id='inputPathsDisplayArea' hidden>
      <h3>target files</h3>
      <List style={{overflowY: 'scroll', height: '200px'}}>
        {inputPathList}
      </List>
    </div>
  )
}