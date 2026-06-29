interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function Modal({ message, onConfirm, onCancel }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-2xl p-6 w-[320px] flex flex-col items-center gap-5 shadow-lg">
                <p className="text-[18px] font-semibold text-center">{message}</p>
                <div className="flex gap-4 w-full">
                    <button
                        onClick={onCancel}
                        className="flex-1 h-[44px] rounded-full border-[2px] border-secondary text-secondary font-medium text-[16px]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 h-[44px] rounded-full bg-secondary text-white font-medium text-[16px]"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;