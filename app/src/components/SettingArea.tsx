
import { useContext, useEffect } from 'react';
import { appContext } from '../app'
import { Typography } from '@mui/material';
import { LanguageSelection } from './LanguageSelection';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';


export const SettingArea = () => {
  const context = useContext(appContext)

  useEffect(() => {
    const hasInput = context.inputPaths.length > 0
    document.getElementById('SettingArea').hidden = !hasInput
  })

  return (
    <div id="SettingArea" hidden>
      <Typography variant="h6" gutterBottom>
        <SettingsApplicationsIcon /> Settings
      </Typography>

      <LanguageSelection />
    </div>
  )
}