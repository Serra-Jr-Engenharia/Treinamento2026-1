import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {

  const [genre, setGenre] = useState('...');
  

  const navigate = useNavigate(); 


  useEffect(() => {
    async function fetchGenre() {
   
      const apiKey = import.meta.env.VITE_OMDB_API_KEY; 
      
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
        const data = await res.json();
        setGenre(data.Genre || 'N/A');
  
      } catch (error) {
        setGenre('');
      }
    }
    if (movie.imdbID) fetchGenre();
  }, [movie.imdbID]);

  return (
    <div 

      onClick={() => navigate(`/filmes/${movie.imdbID}`)}
      className="w-[242px] h-[318px] bg-serra-orange rounded-[22px] flex flex-col cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md mx-auto p-3"
    >
      { }
      <div className="flex-1 w-full bg-[#d1d5db] rounded-2xl overflow-hidden flex items-center justify-center">
        {movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-800 font-medium text-sm">Poster</span>
        )}
      </div>
      
      {}
      <div className="h-[70px] w-full flex flex-col justify-center items-center text-white text-center mt-1 px-1">
        <h3 className="font-bold text-base line-clamp-1" title={movie.Title}>
          {movie.Title}
        </h3>
        {}
        <p className="text-xs font-medium mt-1">{movie.Year} • {genre}</p>
      </div>
    </div>
  );
}