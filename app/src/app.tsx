import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { DropArea } from './components/DropArea'
import { DisplayInput } from './components/DisplayInput'

export const appContext = createContext({})


const App = () => {
  const [inputPaths, setInputPaths] = useState([])
  const contextValues = {
    'inputPaths': inputPaths,
    'setInputPaths': setInputPaths
  }

  return (
    <appContext.Provider value={ contextValues }>
      <div>
        <h2>Input</h2>
        <DropArea />
        <DisplayInput />
        <footer className="footer"></footer>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
