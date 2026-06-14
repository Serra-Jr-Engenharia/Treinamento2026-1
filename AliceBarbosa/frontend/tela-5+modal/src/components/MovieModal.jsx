import { useEffect, useState } from 'react';

export default function MovieModal({ movieId, apiKey, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=short`);
        const data = await res.json();
        setDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes", error);
      } finally {
        setLoading(false);
      }
    }
    if (movieId) fetchDetails();
  }, [movieId, apiKey]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-[22px] max-w-lg w-full p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl cursor-pointer">✕</button>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serra-orange"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <img src={details?.Poster !== 'N/A' ? details?.Poster : ''} alt="Poster" className="w-32 h-48 object-cover rounded-lg hidden md:block" />
            <div>
              <h2 className="text-2xl font-bold text-serra-blue mb-1">{details?.Title}</h2>
              <p className="text-sm text-gray-500 mb-4">{details?.Year} • {details?.Genre}</p>
              <p className="text-gray-700 text-sm mb-4">{details?.Plot !== 'N/A' ? details?.Plot : 'Sinopse não disponível.'}</p>
              <div className="inline-block bg-serra-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                IMDB: {details?.imdbRating}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}