import { useState } from "react";

const receitasIniciais = [
  {
    id: 1,
    nome: "Miojo",
    ingredientes: "Macarrão instantâneo, tempero e água",
    tempo: "15 Minutos",
  },
  {
    id: 2,
    nome: "Arroz",
    ingredientes: "Arroz, alho, sal, água",
    tempo: "20 Minutos",
  },
  {
    id: 3,
    nome: "Feijão",
    ingredientes: "Feijão, alho, sal, linguiça, bacon, água",
    tempo: "30 Minutos",
  },
  {
    id: 4,
    nome: "Filé de boi",
    ingredientes: "Filé de boi, óleo, sal, alho, tempero",
    tempo: "10 Minutos",
  },
];

export default function App() {
  const [receitas, setReceitas] = useState(receitasIniciais);

  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [tempo, setTempo] = useState("");

  function adicionarReceita() {
    if (!nome.trim() || !ingredientes.trim() || !tempo.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaReceita = {
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

  function removerReceita(id) {
    setReceitas(
      receitas.filter((receita) => receita.id !== id)
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <header className="bg-[#001830] py-5">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-white">
            Lista de Receitas
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome da Receita"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-full border-2 border-orange-500 px-5 py-3 outline-none bg-white"
          />

          <input
            type="text"
            placeholder="Ingredientes"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            className="w-full rounded-full border-2 border-orange-500 px-5 py-3 outline-none bg-white"
          />

          <input
            type="text"
            placeholder="Tempo de Preparo"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full rounded-full border-2 border-orange-500 px-5 py-3 outline-none bg-white"
          />

          <div className="flex justify-center pt-2">
            <button
              onClick={adicionarReceita}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-12 py-3 rounded-full transition"
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {receitas.map((receita) => (
            <div
              key={receita.id}
              className="bg-orange-500 text-white rounded-2xl p-4 relative text-center"
            >
              <button
                onClick={() => removerReceita(receita.id)}
                className="absolute right-4 top-4 hover:scale-110 transition"
              >
                🗑️
              </button>

              <h2 className="font-bold text-lg">
                {receita.nome}
              </h2>

              <p className="text-sm">
                {receita.ingredientes}
              </p>

              <p className="text-sm mt-1">
                {receita.tempo}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-[#001830] py-5">
        <p className="text-center text-white text-sm">
          COPYRIGHT © 2026 - SERRA JUNIOR ENGENHARIA
        </p>
      </footer>
    </div>
  );
}