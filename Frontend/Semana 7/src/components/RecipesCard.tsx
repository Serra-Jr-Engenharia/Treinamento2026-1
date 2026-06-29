import { Trash2 } from "lucide-react"
import { useState } from "react"

interface Recipe {
    id: string
    name: string
    ingredientes: string
    tempo: string
    onDelete: (id: string) => void
}

export default function RecipesCard({ id, name, ingredientes, tempo, onDelete }: Recipe) {

    const [openModal, setOpenModal] = useState(false)

    const deleteConfirmation = () => {
        onDelete(id)
        setOpenModal(false)
    }

    return (
        <div className="relative bg-secondary p-4 pr-12 rounded-xl shadow-sm text-center text-white font-sans">
            <p className="font-bold text-xl">{name}</p>
            <p className="my-2">{ingredientes}</p>
            <p className="text-sm font-medium">{tempo}</p>

            <Trash2 onClick={() => setOpenModal(true)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-primary transition-colors" />

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center animate-fade-in">
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Excluir Receita?</h3>

                        <p className="text-sm text-gray-500 mb-6"> Tem certeza que deseja excluir a receita de <span className="font-semibold text-gray-700">"{name}"</span>? Esta ação não pode ser desfeita.</p>

                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setOpenModal(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer">Cancelar</button>

                            <button onClick={deleteConfirmation} className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer">Sim, excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}