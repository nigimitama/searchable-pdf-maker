import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { getUsedLanguageCode } from './components/LanguageSelection';
import { ExecuteButton } from './components/ExecuteButton';
import { SettingArea } from './components/SettingArea';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { InputArea } from './components/InputArea';

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
  const [outputPath, setOutputPath] = useState(' ')

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
        <Stack direction="row" spacing={2} style={{width: 950, height: 350}}>
          <Paper style={{width: 550, padding: 20}}>
            <InputArea />
          </Paper>

          <Stack spacing={2} style={{width: 400}}>
            <Paper style={{padding: 20}}>
              <SettingArea />
            </Paper>

            <Paper style={{padding: 40, textAlign: 'center', height: "100%"}}>
              <ExecuteButton />
            </Paper>
          </Stack>
        </Stack>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
