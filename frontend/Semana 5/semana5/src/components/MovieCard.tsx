interface Movie {
  Title: string
  Year: string
  Poster: string
  Genre?: string
}

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <div
      className="rounded-2xl p-3 flex flex-col items-center"
      style={{ backgroundColor: '#FF6600', width: '190px' }}
    >
      <div
        className="rounded-xl overflow-hidden bg-gray-300 flex items-center justify-center"
        style={{ width: '166px', height: '218px' }}
      >
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">Poster</span>
        )}
      </div>

      <div className="mt-2 text-center w-full px-1">
        <p className="text-white font-bold text-sm leading-tight line-clamp-2">{movie.Title}</p>
        <p className="text-white text-xs mt-1">{movie.Year}</p>
        {movie.Genre && (
          <p className="text-white text-xs mt-1 opacity-90 line-clamp-2">{movie.Genre}</p>
        )}
      </div>
    </div>
  )
}
