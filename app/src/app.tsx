import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { DropArea } from './components/DropArea'
import { DisplayInput } from './components/DisplayInput'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { LanguageSelection } from './components/LanguageSelection';
import Typography from '@mui/material/Typography';
import { OutputPathForm } from './components/OutputPathForm';

interface contextValues {
  inputPaths: string[],
  setInputPaths: React.Dispatch<React.SetStateAction<string[]>>,
  languageCodes: string[],
  setLanguageCodes: React.Dispatch<React.SetStateAction<string[]>>,
  outputPath: string,
  setOutputPath: React.Dispatch<React.SetStateAction<string>>,
}

export const appContext = createContext({})


const App = () => {
  const [inputPaths, setInputPaths] = useState([''])
  const [languageCodes, setLanguageCodes] = useState([''])
  const [outputPath, setOutputPath] = useState('')

  const contextValues: contextValues = {
    'inputPaths': inputPaths,
    'setInputPaths': setInputPaths,
    'languageCodes': languageCodes,
    'setLanguageCodes': setLanguageCodes,
    'outputPath': outputPath,
    'setOutputPath': setOutputPath
  }

  return (
    <appContext.Provider value={contextValues}>
      <div>

        <section>
          <Typography variant="h6">Input</Typography>
          <DropArea />
          <DisplayInput />
        </section>

        <section style={{ margin: '1em 0 1em 0' }}>
          <Typography variant="h6" gutterBottom>
            <SettingsApplicationsIcon />
            Settings
          </Typography>
          <LanguageSelection />
        </section>

        <section>
          <OutputPathForm />
        </section>

      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
