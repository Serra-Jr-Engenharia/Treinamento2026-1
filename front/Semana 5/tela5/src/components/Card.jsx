function Card({ poster, titulo, ano, genero }) {

    const tamanhoTitulo = titulo.length > 20 ? 'text-[14px]' : titulo.length > 12 ? 'text-[17px]' : 'text-[20px]';

  return (
    <div className="bg-secondary rounded-[22px] w-full max-w-[228px] h-[318px] pt-[16px] flex flex-col items-center hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-300 transition-transform group cursor-pointer">

      {poster !== 'N/A' && poster ? (
        <img
          src={poster}
          alt={titulo}
          className="rounded-[22px] w-[194px] h-[229px] object-cover rounded-xl"
        />
      ) : (
        <div className="w-[194px] h-[229px] bg-[#D9D9D9] rounded-[22px] flex items-center justify-center text-black text-sm">
            Poster
        </div>
      )}

      <div className="w-full text-center mt-3 flex flex-col gap-1">
        <span className={`${tamanhoTitulo} font-bold line-clamp-1`}>{titulo}</span>
        <span className="text-[15px] font-regular">{ano}</span>
        <span className="text-black text-[15px] font-regular line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{genero}</span>
      </div>

    </div>
  );
}

export default Card;