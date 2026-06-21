export default function MovieCard({ movie, onClick }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div
      className="bg-orange-500 hover:bg-[#001830] rounded-2xl p-2.5 pb-3.5 flex flex-col items-center text-white text-center shadow-md transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div className="w-full aspect-[2/3] bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center mb-2.5">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`Poster de ${movie.Title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-500 font-medium text-sm">Sem Poster</span>
        )}
      </div>

      <h3 className="text-sm font-bold leading-snug mb-1 line-clamp-2 w-full" title={movie.Title}>
        {movie.Title}
      </h3>

      <p className="text-sm opacity-90">{movie.Year}</p>
    </div>
  );
}