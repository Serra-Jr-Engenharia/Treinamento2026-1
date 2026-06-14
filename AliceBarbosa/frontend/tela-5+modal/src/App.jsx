import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';

const API_KEY = "d23860ac";

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error === "Movie not found!" ? "Nenhum filme encontrado." : "Erro na busca.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão com a API.");
    } finally {
   
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-gray-50">
      <Header />

      <main className="flex-1 w-full flex flex-col pb-16">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSearch={handleSearch} 
        />

        { }
        {loading && <p className="text-center mt-12 text-serra-orange font-bold text-xl">Buscando filmes...</p>}
        {error && <p className="text-center mt-12 text-red-500 font-bold text-xl">{error}</p>}

        {}
        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-4 max-w-[1366px] mx-auto w-full px-6 mt-16">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                movie={movie} 
                onClick={(id) => setSelectedMovieId(id)} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Fator Inovação: Modal  */}
      <MovieModal 
        movieId={selectedMovieId} 
        apiKey={API_KEY} 
        onClose={() => setSelectedMovieId(null)} 
      />

      <Footer />
    </div>
  );
}