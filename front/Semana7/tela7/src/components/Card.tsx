import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";

interface CardProps {
    receita: string;
    ingredientes: string;
    tempo: number;
    onDelete: () => void;
}

function Card({ receita, ingredientes, tempo, onDelete }: CardProps) {
    const [showModal, setShowModal] = useState(false);

    function handleConfirm() {
        onDelete();
        setShowModal(false);
    }

    return (
        <>
            <div className="bg-secondary h-[91px] rounded-[22px] py-[6px] px-[13px] flex justify-between items-center text-white">
                <div className="text-center flex-1">
                    <h2 className="font-bold text-[20px]">{receita}</h2>
                    <p className="font-normal text-[16px]">{ingredientes}</p>
                    <p className="font-normal text-[16px]">{tempo} Minutos</p>
                </div>

                <button onClick={() => setShowModal(true)}>
                    <Trash2 size={24} color="white" />
                </button>
            </div>

            {showModal && (
                <Modal
                    message="Você deseja realmente excluir?"
                    onConfirm={handleConfirm}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
}

export default Card;

