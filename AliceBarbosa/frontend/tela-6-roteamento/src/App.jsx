import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';

export default function App() {
  return (
    <BrowserRouter>
     {}
      <nav className="py-2 px-6 bg-gray-900 text-gray-300 text-sm flex gap-8 justify-center shadow-md">
        <Link to="/" className="hover:text-serra-orange font-semibold transition-colors">
          Início (Semana 4)
        </Link>
        <Link to="/filmes" className="hover:text-serra-orange font-semibold transition-colors">
          Busca de Filmes (Semana 5)
        </Link>
      </nav>
      {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<Movies />} />
        {/* FATOR INOVAÇÃO: Rota dinâmica esperando um ID */}
        <Route path="/filmes/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}