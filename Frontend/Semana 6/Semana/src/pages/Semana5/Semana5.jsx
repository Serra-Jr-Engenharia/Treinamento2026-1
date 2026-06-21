import { useState } from 'react';
import MovieCard from './Components/MovieCard';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

function Semana5() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Por favor, digite o nome de um filme!');
      return;
    }

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(`Nenhum filme encontrado para "${query}".`);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Erro ao buscar filmes. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleCardClick = async (movie) => {
    setLoadingDetail(true);
    setSelected(null);
    setErrorDetail('');

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
      );

      const data = await response.json();

      if (data.Response === 'True') {
        setSelected(data);
      } else {
        setErrorDetail('Não foi possível carregar os detalhes do filme.');
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
      setErrorDetail(
        'Falha de conexão. Verifique sua internet e tente novamente.'
      );
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => setSelected(null);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col font-sans">

      <header className="bg-[#001830] h-[97px] content-center text-white py-5 px-[5%]">
        <h1 className="text-2xl font-bold tracking-wide">Lista de Filmes</h1>
      </header>

      <main className="flex-1 w-[92%] mx-auto my-5">

       
        {errorDetail && (
          <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {errorDetail}
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Nome do filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-6 py-3 border-2 border-orange-500 rounded-full outline-none text-base focus:ring-2 focus:ring-orange-300 bg-white text-gray-900"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-orange-500 hover:bg-[#001830] hover:scale-105 disabled:opacity-60 text-white px-8 py-3 rounded-full text-base font-bold transition-colors duration-200"
          >
            Pesquisar
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-5">Buscando filmes...</p>
        )}

        {error && (
          <p className="text-center text-gray-500 mt-5">{error}</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </main>
      {loadingDetail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <p className="text-white text-lg">Carregando...</p>
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-5 p-6">

              <div className="shrink-0 w-36 rounded-xl overflow-hidden bg-gray-200">
                {selected.Poster && selected.Poster !== 'N/A' ? (
                  <img
                    src={selected.Poster}
                    alt={selected.Title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-gray-400 text-sm">
                    Sem Poster
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h2 className="text-xl font-bold text-gray-900 leading-snug">
                  {selected.Title}
                </h2>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-orange-500 text-white px-3 py-0.5 rounded-full font-medium">
                    {selected.Year}
                  </span>

                  {selected.Runtime && selected.Runtime !== 'N/A' && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-0.5 rounded-full">
                      {selected.Runtime}
                    </span>
                  )}

                  {selected.imdbRating && selected.imdbRating !== 'N/A' && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-0.5 rounded-full font-medium">
                      ★ {selected.imdbRating}
                    </span>
                  )}
                </div>

                {selected.Genre && selected.Genre !== 'N/A' && (
                  <p className="text-sm text-gray-500">{selected.Genre}</p>
                )}

                {selected.Director && selected.Director !== 'N/A' && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Diretor:</span>{' '}
                    {selected.Director}
                  </p>
                )}

                {selected.Actors && selected.Actors !== 'N/A' && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Elenco:</span>{' '}
                    {selected.Actors}
                  </p>
                )}
              </div>
            </div>

            {selected.Plot && selected.Plot !== 'N/A' && (
              <div className="px-6 pb-4">
                <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  Sinopse
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selected.Plot}
                </p>
              </div>
            )}

            <div className="px-6 pb-6 pt-2">
              <button
                onClick={handleCloseModal}
                className="w-full bg-[#001830] hover:bg-[#002a50] text-white py-2.5 rounded-full font-medium transition-colors duration-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Semana5;