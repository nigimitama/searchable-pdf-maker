import { createRoot } from 'react-dom/client';
import { useState, createContext, Dispatch, SetStateAction, FC } from 'react';
import { getUsedLanguageCode } from './components/LanguageSelection';
import { ExecuteButton } from './components/ExecuteButton';
import { SettingArea } from './components/SettingArea';

import Stack from '@mui/material/Stack';
import { InputArea } from './components/InputArea';

export type contextValues = {
  inputPaths: string[],
  setInputPaths: Dispatch<SetStateAction<string[]>>,
  languageCodes: string[],
  setLanguageCodes: Dispatch<SetStateAction<string[]>>,
  outputPath: string,
  setOutputPath: Dispatch<SetStateAction<string>>,
}

export const appContext = createContext(null)

const App: FC = () => {
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
          <div style={{width: 550, padding: 20}}>
            <InputArea />
          </div>

          <Stack spacing={2} style={{width: 400}}>
            <div style={{padding: 20}}>
              <SettingArea />
            </div>

            <div style={{padding: 40, textAlign: 'center', height: "100%"}}>
              <ExecuteButton />
            </div>
          </Stack>
        </Stack>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
