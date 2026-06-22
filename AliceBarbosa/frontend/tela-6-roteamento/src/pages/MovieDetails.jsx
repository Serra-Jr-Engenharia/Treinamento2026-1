import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() {

  const { id } = useParams(); 
  

  const navigate = useNavigate(); 
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {

      const apiKey = import.meta.env.VITE_OMDB_API_KEY; 
      
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Carregando detalhes...</div>;
  if (!movie) return <div className="text-center mt-20 text-xl text-red-500">Filme não encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sem+Poster'} 
        alt={movie.Title} 
        className="w-full md:w-80 rounded-xl shadow-md object-cover" 
      />
      
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-[#001830]">{movie.Title} ({movie.Year})</h1>
        
        <p className="text-sm font-bold bg-[#FF6600] text-white px-3 py-1 w-max rounded-full">
          {movie.Genre}
        </p>
        
        <div className="text-gray-700 space-y-2 mt-4">
          <p><strong>Diretor:</strong> {movie.Director}</p>
          <p><strong>Atores:</strong> {movie.Actors}</p>
          <p><strong>Duração:</strong> {movie.Runtime}</p>
          <p><strong>Nota IMDB:</strong> ⭐ {movie.imdbRating}</p>
        </div>
        
        <p className="text-gray-600 mt-4 leading-relaxed border-t pt-4">
          {movie.Plot}
        </p>
        
        <button 
          onClick={() => navigate(-1)} 
          className="mt-auto bg-[#001830] text-white px-6 py-3 rounded-lg w-max hover:bg-[#FF6600] transition-colors font-semibold"
        >
          ← Voltar para a busca
        </button>
      </div>
    </div>
  );
}