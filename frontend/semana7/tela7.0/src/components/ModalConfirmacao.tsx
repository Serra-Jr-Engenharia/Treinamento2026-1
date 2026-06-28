interface ModalProps {
  isOpen: boolean;           // Controla se o modal está visível ou não
  onClose: () => void;       // Função para fechar (Cancelar)
  onConfirm: () => void;     // Função para excluir de verdade (Sim)
}

export default function ModalConfirmacao({ isOpen, onClose, onConfirm }: ModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="bg-white rounded-[22px] p-8 w-full max-w-100 shadow-2xl flex flex-col items-center text-center animate-fade-in">
        <h3 className="font-['Poppins'] font-bold text-[24px] text-[#001830] mb-2">
          Atenção!
        </h3>
        <p className="font-['Poppins'] text-[18px] text-gray-600 mb-8">
          Você deseja realmente excluir esta receita?
        </p>

        <div className="flex w-full gap-4 justify-center">
          <button 
            onClick={onClose}
            className="flex-1 h-12 rounded-[22px] border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 h-12 rounded-[22px] bg-[#ff6600] text-white font-bold hover:bg-[#e65c00] transition-colors"
          >
            Sim, excluir
          </button>
        </div>
      </div>
      
    </div>
  );
}