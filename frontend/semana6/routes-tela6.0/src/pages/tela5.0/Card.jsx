import { useState } from 'react';

export default function Card({ title, year, poster, imdbID, apiKey }) {
  const [expandido, setExpandido] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  
  // Aqui guardamos o JSON inteiro da Rota ?i
  const [detalhes, setDetalhes] = useState(null); 
  const [carregando, setCarregando] = useState(false);

  const fallbackImage = 'https://via.placeholder.com/194x229?text=Sem+Poster';

  const buscarDetalhes = async () => {
    setMostrarDetalhes(!mostrarDetalhes);
    if (!mostrarDetalhes && !detalhes) {
      setCarregando(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();
        if (data.Response === "True") {
          setDetalhes(data); // Salvamos o objeto JSON completo aqui
        }
      } catch (erro) {
        console.error("Erro ao buscar detalhes:", erro);
      } finally {
        setCarregando(false);
      }
    }
  };

  return (
    <div className="relative w-[228px] min-h-[318px] pb-4 bg-[#FF6600] rounded-[22px] flex flex-col items-center pt-[24px] shadow-md hover:scale-105 transition-transform duration-200 mx-auto">
      
      <button 
        onClick={buscarDetalhes}
        className="absolute top-3 right-3 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold pb-2 transition-colors cursor-pointer"
        title="Ver mais detalhes"
      >
        ...
      </button>

      <div className="relative w-[194px] h-[229px] rounded-[18px] overflow-hidden mb-[4px] bg-[#D9D9D9] shrink-0">
        <img 
          src={poster !== 'N/A' ? poster : fallbackImage} 
          alt={`Poster do filme ${title}`}
          className="w-full h-full object-cover"
        />
        
        {mostrarDetalhes && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center text-white z-10 transition-opacity overflow-y-auto custom-scrollbar">
            {carregando ? (
              <p className="text-sm animate-pulse">Carregando...</p>
            ) : detalhes ? (
              <div className="flex flex-col gap-3 w-full">
                
                {/* 1. Consumindo a chave "Genre" do JSON */}
                <div>
                  <span className="font-bold text-[#FF6600] text-sm block">Gênero</span>
                  <p className="text-xs leading-tight">{detalhes.Genre}</p>
                </div>
                
                {/* 2. Consumindo a chave "imdbRating" do JSON */}
                <div>
                  <span className="font-bold text-[#FF6600] text-sm block">IMDb</span>
                  <p className="text-xs text-yellow-400 font-bold">⭐ {detalhes.imdbRating}</p>
                </div>

                {/* 3. Consumindo e mapeando o array "Ratings" do JSON */}
                {detalhes.Ratings && detalhes.Ratings.length > 0 && (
                  <div className="mt-1 w-full text-left">
                    <span className="font-bold text-[#FF6600] text-xs block mb-1 text-center">Outras Notas</span>
                    {detalhes.Ratings.map((rating) => (
                      <div key={rating.Source} className="flex justify-between text-[10px] border-b border-white/20 pb-1 mb-1">
                        <span className="opacity-80 truncate pr-2">{rating.Source}:</span>
                        <span className="font-bold">{rating.Value}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ) : (
              <p className="text-xs text-red-300">Erro ao carregar.</p>
            )}
          </div>
        )}
      </div>
      
      <div className="text-center text-white w-full px-4 flex flex-col items-center justify-center">
        <h3 
          onClick={() => setExpandido(!expandido)}
          title="Clique para expandir/encolher"
          className={`font-bold text-[20px] leading-[30px] w-full cursor-pointer transition-all ${expandido ? 'whitespace-normal' : 'truncate'}`}
        >
          {title}
        </h3>
        <p className="font-normal text-[15px] leading-[23px]">
          {year}
        </p>
      </div>

    </div>
  );
}