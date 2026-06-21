import { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Card from './Card';
import Footer from './Footer';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Substitua pelo seu token gerado no omdbapi.com
  const API_KEY = '6f6e3154'; 

  const handleSearchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();
      console.log("Resposta do JSON:", data);

      if (data.Response === "True") {
        setMovies(data.Search); 
      } else {
        setError(data.Error || 'Filme não encontrado.');
        setMovies([]);
      }
    } catch (err) {
      setError('Erro ao se conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      
      <main className="flex-grow max-w-8xl mx-auto w-full px-6 py-10">
        
        <SearchBar onSearch={handleSearchMovies} />
   
        {loading && (
          <div className="text-center mt-12 text-lg text-gray-500 font-semibold animate-pulse">
            Carregando filmes...
          </div>
        )}

        {error && (
          <div className="text-center mt-12 text-red-500 font-medium">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-[repeat(auto-fit,242px)] justify-center gap-8 mt-10">
            {movies.map((movie) => (
              <Card 
                key={movie.imdbID}
                title={movie.Title} 
                year={movie.Year} 
                poster={movie.Poster}
                imdbID={movie.imdbID} 
                apiKey={API_KEY}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}