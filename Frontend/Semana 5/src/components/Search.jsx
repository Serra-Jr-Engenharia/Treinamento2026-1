import { useState } from "react"
import { ArrowDownAZ, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp } from "lucide-react"

function Search({ onSearch, onFilterChange }) {

    const configFilters = [
        { id: "az", icon: <ArrowUpAZ size={22} />, title:"Ordena de A a Z" },
        { id: "za", icon: <ArrowDownAZ size={22} />, title:"Ordena de Z a A" },
        { id: "new", icon: <CalendarArrowUp size={22} />, title:"Ordena pelo mais recente" },
        { id: "last", icon: <CalendarArrowDown size={22} />, title:"Ordena pelo mais velho" },
    ]

    const [input, setInput] = useState("")
    const [activeFilter, setFilter] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (input.trim() !== "") {
            onSearch(input)
        }
    }

    const handleFilter = (filterType) => {
        setFilter(filterType)
        onFilterChange(filterType)
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full flex-1">
                <input
                    type="text"
                    placeholder="Nome do filme..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full sm:flex-1 max-w-100 h-12 border-2 border-secondary rounded-3xl p-4 focus:border-primary"
                />
                <button
                    type="submit"
                    className="w-full sm:w-35 h-12 bg-secondary text-white rounded-3xl text-lg font-bold hover:bg-secondary/90 cursor-pointer"
                >Pesquisar</button>
            </form>
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-3xl border border-slate-200">
                {configFilters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => handleFilter(filter.id)}
                        title={filter.title}
                        className={`p-2 rounded-full transition-all cursor-pointer
                            ${activeFilter === filter.id ? "bg-secondary text-white shadow-md" : "text-slate-600 hover:bg-slate-200"} 
                            `}>{filter.icon}</button>
                ))}
            </div>
        </div>
    )
}

export default Search