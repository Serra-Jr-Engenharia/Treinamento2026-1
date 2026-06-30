function MovieCard({ movie }) {
  return (
    <div
      className="
        bg-[#FF6600]
        rounded-[16px]
        p-[12px]
        w-full
        flex
        flex-col
        items-center
      "
    >
      {movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="
            w-full
            aspect-[2/3]
            object-cover
            rounded-[12px]
          "
        />
      ) : (
        <div
          className="
            w-full
            aspect-[2/3]
            bg-gray-300
            rounded-[12px]
            flex
            items-center
            justify-center
          "
        >
          Sem imagem
        </div>
      )}

      <h2
        className="
          text-white
          font-bold
          text-[18px]
          text-center
          mt-[8px]
          leading-[22px]
        "
      >
        {movie.Title}
      </h2>

      <p className="text-white text-[14px]">
        {movie.Year}
      </p>

      <p className="text-white text-[14px] capitalize">
        {movie.Type}
      </p>
    </div>
  );
}

export default MovieCard;