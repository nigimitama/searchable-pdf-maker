import { createRoot } from 'react-dom/client';
import { FileOpenButton } from './components/FileOpenButton'
import { DropArea } from './components/DropArea'


const App = () => {
  return (
    <div>
      <h2>Hello from React!</h2>
      <FileOpenButton />
      <DropArea />
      <footer className="footer"></footer>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)
