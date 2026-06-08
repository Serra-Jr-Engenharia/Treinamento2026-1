import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MemberCards from "./components/MemberCards"
import { LayoutGrid, Rows3 } from "lucide-react"

export default function App() {
    const [membros, setMembros] = useState([
        { id: 1, membro: "Membro 1", nome: "Nome", idade: "Idade", curso: "Curso" },
        { id: 2, membro: "Membro 2", nome: "Nome", idade: "Idade", curso: "Curso" },
        { id: 3, membro: "Membro 3", nome: "Nome", idade: "Idade", curso: "Curso" },
    ])

    const [gridView, setGridView] = useState(true)

    const changeTitle = (id, newTitle) => {
        setMembros(membros.map((m) =>
            (m.id === id ? { ...m, membro: newTitle } : m))
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Header />
            <main className="flex-1 flex flex-col gap-6 p-8 max-w-7xl mx-auto w-full">
                <div className="flex justify-end items-center gap-2 border-b border-slate-200 pb-4 w-full">
                    <button onClick={() => setGridView(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${gridView ? "bg-secondary text-text shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button onClick={() => setGridView(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!gridView ? "bg-secondary text-text shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        <Rows3 className="w-5 h-5" />
                    </button>
                </div>

                <div className={gridView ? "grid grid-cols-1 md:grid-cols-3 gap-12 w-full justify-items-center" : "flex flex-col gap-6 w-full max-w-7xl mx-auto"}>
                    {membros.map((item) => (
                        <MemberCards
                            key={item.id}
                            id={item.id}
                            membro={item.membro}
                            nome={item.nome}
                            idade={item.idade}
                            curso={item.curso}
                            saveTitle={changeTitle}
                            gridView={gridView}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}