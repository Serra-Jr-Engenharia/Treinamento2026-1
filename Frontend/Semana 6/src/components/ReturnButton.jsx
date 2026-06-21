import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function ReturnButton() {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-2xl text-sm border border-slate-700/50 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 cursor-pointer select-none absolute top-4 right-4 z-50"
        >
            <ArrowLeft size={18} className="text-orange-500" />
            <span>Voltar ao Início</span>
        </button>
    )
}

export default ReturnButton