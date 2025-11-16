import { Outlet } from 'react-router-dom';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Rodape from './components/Rodape/Rodape';
import './global.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      <main className="flex-1 bg-[var(--cinza-claro)] p-6">
        <Outlet />
      </main>
      <Rodape />
    </div>
  );
}

export default App;
