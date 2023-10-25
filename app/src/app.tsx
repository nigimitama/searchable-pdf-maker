import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { DropArea } from './components/DropArea'
import { DisplayInput } from './components/DisplayInput'
import { LanguageSelection, getUsedLanguageCode } from './components/LanguageSelection';
import { OutputPathForm } from './components/OutputPathForm';
import { ExecuteButton } from './components/ExecuteButton';
import Typography from '@mui/material/Typography';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';


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
  const [inputPaths, setInputPaths] = useState([])
  const [languageCodes, setLanguageCodes] = useState([getUsedLanguageCode()])
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
          <Typography variant='h6'>Output Path</Typography>
          <OutputPathForm />
        </section>

        <section style={{padding: '10px 0 10px 0', textAlign: 'center'}}>
          <ExecuteButton />
        </section>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
