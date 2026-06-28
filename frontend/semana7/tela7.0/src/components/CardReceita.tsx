import iconeLixeira from '../assets/lixeira.png';

type ReceitaId = string;

interface CardReceitaProps {
  id: ReceitaId;
  nome: string;
  ingredientes: string;
  tempo: string;
  onExcluir: (id: ReceitaId) => void; 
}

export default function CardReceita({ id, nome, ingredientes, tempo, onExcluir }: CardReceitaProps) {

  const handleLixeiraClick = (): void => {
    onExcluir(id);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-140 h-23 rounded-[22px] bg-[#ff6600] px-12 shadow-md">
      <h2 className="font-bold text-[20px] leading-none text-white text-center mb-1">{nome}</h2>
      <p className="font-normal text-[16px] leading-none text-white text-center mb-1">{ingredientes}</p>
      <p className="font-normal text-[18px] leading-none text-white text-center">{tempo}</p>

      <button 
        type="button"
        onClick={handleLixeiraClick} 
        className="absolute right-6 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
      >
        <img src={iconeLixeira} alt="Excluir" className="w-6 h-6 object-contain" />
      </button>
    </div>
  );
}