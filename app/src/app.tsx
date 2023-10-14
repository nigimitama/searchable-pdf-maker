import { createRoot } from 'react-dom/client';
import { useState, createContext } from 'react';
import { DropArea } from './components/DropArea'

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
        <footer className="footer"></footer>
      </div>
    </appContext.Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
