import { Pen, Save } from "lucide-react"
import { useState } from "react"

function MemberCards({ id, membro, nome, idade, curso, saveTitle, gridView }) {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(membro)

    const save = () => {
        saveTitle(id, title)
        setEdit(false)
    }

    return (
        <div className={`relative bg-primary w-full text-white shadow-xl transition-all duration-300 font-sans ${gridView ? "max-w-sm rounded-3xl pt-12 pb-8 px-6 text-center flex flex-col gap-4 mt-6" : "rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left"}`}>

            <div className={`bg-secondary text-text font-bold px-6 py-3 rounded-2xl shadow-md min-w-40 flex items-center justify-center gap-2 ${gridView ? "absolute -top-6 left-1/2 -translate-x-1/2" : "md:static"}`}>
                {edit ? (
                    <div className="flex items-center gap-1">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white text-slate-900 px-2 py-0.5 rounded text-sm w-24 font-normal focus:outline-none" />
                        <button onClick={save} className="text-xs bg-emerald-600 px-1.5 py-1 rounded hover:bg-emerald-700">
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span>{membro}</span>
                        <button onClick={() => setEdit(true)} className="text-[10px] bg-black/20 p-1 rounded hover:bg-black/40 transition-colors" title="Editar título">
                            <Pen className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className={`flex gap-3 ${gridView ? "flex-col mt-4" : "flex-row flex-1 justify-around items-center ml-4 text-white"}`}>
                <p>{nome}</p>
                <p>{idade}</p>
                <p>{curso}</p>
            </div>
        </div>
    )
}

export default MemberCards