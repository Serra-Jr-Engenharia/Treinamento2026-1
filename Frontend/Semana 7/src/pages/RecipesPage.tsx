import { useState } from "react";
import Footer from "../components/Footer";
import { InputForm } from "../components/InputForm";
import RecipesCard from "../components/RecipesCard";

export default function RecipesPage() {

    const [recipes, setRecipes] = useState([
        { id: "1", name: "Bolo de Chocolate", ingredientes: "Ovos, Óleo, Leite, Açúcar, Achocolatado, Farinha de Trigo", tempo: "50 minutos" },
        { id: "2", name: "Bolo de Cenoura", ingredientes: "Cenouras, Ovos, Óleo, Açúcar, Farinha de Trigo, Fermento em Pó", tempo: "45 minutos" },
        { id: "3", name: "Pudim de Leite Condensado", ingredientes: "Leite Condensado, Leite, Ovos, Açúcar (para a calda)", tempo: "1 hora e 30 minutos" },
        { id: "4", name: "Pão de Queijo Rápido", ingredientes: "Polvilho Doce, Queijo Ralado, Ovos, Óleo, Leite, Sal", tempo: "30 minutos" }
    ]);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const nome = data.get("nome") as string
        const ingredientes = data.get("ingredientes") as string
        const tempo = data.get("tempo") as string

        if (!nome || !ingredientes || !tempo) return

        setRecipes([...recipes, { id: Date.now().toString(), name: nome, ingredientes: ingredientes, tempo: tempo }])
        e.currentTarget.reset()
    }

    const handleDelete = (id: string) => {
        const filterList = recipes.filter(recipe => recipe.id !== id)
        setRecipes(filterList)
    }

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <header className="flex ju  stify-start items-center w-full h-25 bg-primary px-10">
                <p className="text-white font-bold text-4xl">Lista de Receitas</p>
            </header>
            <main className="flex-1 w-full max-w-6xl mx-auto m-4 px-4 sm:px-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-5 w-full items-center">
                    <InputForm name="nome" type="text" placeholder="Nome da Receita" />
                    <InputForm name="ingredientes" type="text" placeholder="Ingredientes" />
                    <InputForm name="tempo" type="text" placeholder="Tempo de Preparo" />
                    <button className="bg-secondary w-[50%] text-white p-2 rounded-4xl text-2xl cursor-pointer sm:w-[25%] sm:p-1 hover:bg-amber-700 transition-colors" type="submit">Adicionar</button>
                </form>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {recipes.length === 0 && (
                        <p className="text-red-500 font-bold text-center col-span-full mt-30 text-2xl animate-bounce">Nenhuma receita cadastrada ainda...</p>
                    )}
                    {recipes.map((recipe) => (
                        <RecipesCard key={recipe.id} id={recipe.id} name={recipe.name} ingredientes={recipe.ingredientes} tempo={recipe.tempo} onDelete={handleDelete} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}   