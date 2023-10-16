import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { DropArea } from './components/DropArea'
import { DisplayInput } from './components/DisplayInput'
import { Divider } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LanguageSelection from './components/LanguageSelection';
export const appContext = createContext({})
import Typography from '@mui/material/Typography';


const App = () => {
  const [inputPaths, setInputPaths] = useState([])
  const [languages, setLanguages] = useState([])
  const contextValues = {
    'inputPaths': inputPaths,
    'setInputPaths': setInputPaths,
    'languages': languages,
    'setLanguages': setLanguages
  }

  return (
    <appContext.Provider value={ contextValues }>
      <div>
        <section>
          <Typography variant="h6">Input</Typography>
          <DropArea />
          <DisplayInput />
        </section>
        <section style={{margin: '1em 0 1em 0'}}>
          <Typography variant="h6" gutterBottom>
            <SettingsApplicationsIcon/>
            Settings
          </Typography>
          <LanguageSelection />
        </section>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
