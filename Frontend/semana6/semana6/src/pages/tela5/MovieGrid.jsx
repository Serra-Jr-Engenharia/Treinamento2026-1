import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div
      className="
        mt-[100px]
        grid
        grid-cols-5
        gap-x-[32px]
        gap-y-[40px]
        mx-[45px]
      "
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </div>
  );
}

export default MovieGrid;