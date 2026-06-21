import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Semana4 from './pages/Semana4/Semana4';
import Semana5 from './pages/Semana5/Semana5';
import Home from './pages/Home';

import Header from './components/Header';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/semana4" element={<Semana4 />} />
        <Route path="/semana5" element={<Semana5 />} />
      </Routes>
    </BrowserRouter>
  );
}