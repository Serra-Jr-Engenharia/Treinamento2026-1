import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home' 
import Tela4 from './pages/tela4.0/Tela4.0' 
import Tela5 from './pages/tela5.0/Tela5.0'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A Home agora é a primeira página que abre */}
        <Route path="/" element={<Home />} />
        
        {/* A Tela 4 ganha uma rota específica */}
        <Route path="/tela4" element={<Tela4 />} />
        
        {/* A Tela 5 mantém a rota dela */}
        <Route path="/tela5" element={<Tela5 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes