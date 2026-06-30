import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeCard from "./components/RecipeCard";
import type { Recipe } from "./interfaces/Recipe";

function App() {
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [tempo, setTempo] = useState("");

  const [receitas, setReceitas] = useState<Recipe[]>([
    {
      id: 1,
      nome: "Miojo",
      ingredientes: "Macarrão instantâneo, tempero e água",
      tempo: "15",
    },
    {
      id: 2,
      nome: "Arroz",
      ingredientes: "Arroz, alho, sal e água",
      tempo: "20",
    },
    {
      id: 3,
      nome: "Feijão",
      ingredientes: "Feijão, alho, sal, linguiça, bacon e água",
      tempo: "30",
    },
    {
      id: 4,
      nome: "Filé de boi",
      ingredientes: "Filé de boi, óleo, sal e alho",
      tempo: "10",
    },
  ]);

  function adicionarReceita() {
    if (!nome.trim() || !ingredientes.trim() || !tempo.trim()) return;

    const novaReceita: Recipe = {
      id: Date.now(),
      nome,
      ingredientes,
      tempo,
    };

    setReceitas([...receitas, novaReceita]);

    setNome("");
    setIngredientes("");
    setTempo("");
  }

  function excluirReceita(id: number) {
    setReceitas(receitas.filter((receita) => receita.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 border-t-2 border-[#0094FF] py-8">
        <div className="w-[1120px] mx-auto">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nome da Receita"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border-2 border-[#FF6600] rounded-[22px] px-5 py-3 outline-none placeholder:text-gray-400"
            />

            <input
              type="text"
              placeholder="Ingredientes"
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
              className="border-2 border-[#FF6600] rounded-[22px] px-5 py-3 outline-none placeholder:text-gray-400"
            />

            <input
              type="number"
              placeholder="Tempo de Preparo"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              className="border-2 border-[#FF6600] rounded-[22px] px-5 py-3 outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={adicionarReceita}
              className="bg-[#FF6600] text-white text-xl font-semibold px-12 py-3 rounded-[22px] hover:opacity-90 transition cursor-pointer"
            >
              Adicionar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-10">
            {receitas.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={excluirReceita}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;