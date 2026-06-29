import { useState } from 'react'

interface Receita {
  id: number
  nome: string
  ingredientes: string
  tempo: string
}

export default function App() {
  const [receitas, setReceitas] = useState<Receita[]>([])
  const [nome, setNome] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [tempo, setTempo] = useState('')

  function adicionarReceita() {
    if (!nome.trim() || !ingredientes.trim() || !tempo.trim()) return

    const novaReceita: Receita = {
      id: Date.now(),
      nome: nome.trim(),
      ingredientes: ingredientes.trim(),
      tempo: tempo.trim(),
    }

    setReceitas((prev) => [...prev, novaReceita])
    setNome('')
    setIngredientes('')
    setTempo('')
  }

  function removerReceita(id: number) {
    setReceitas((prev) => prev.filter((r) => r.id !== id))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') adicionarReceita()
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header className="px-8 py-5" style={{ backgroundColor: '#001830' }}>
        <h1 className="text-white text-2xl font-bold">Lista de Receitas</h1>
      </header>

      {/* Main */}
      <main className="flex-1 bg-white px-8 py-8">
        {/* Formulário */}
        <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Nome da Receita"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-5 py-3 rounded-full outline-none text-gray-500 placeholder-gray-400"
            style={{ border: '2px solid #FF6600' }}
          />
          <input
            type="text"
            placeholder="Ingredientes"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-5 py-3 rounded-full outline-none text-gray-500 placeholder-gray-400"
            style={{ border: '2px solid #FF6600' }}
          />
          <input
            type="text"
            placeholder="Tempo de Preparo"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-5 py-3 rounded-full outline-none text-gray-500 placeholder-gray-400"
            style={{ border: '2px solid #FF6600' }}
          />

          <div className="flex justify-center mt-2">
            <button
              onClick={adicionarReceita}
              className="px-12 py-3 rounded-full text-white font-semibold text-lg transition-opacity hover:opacity-90 active:opacity-75"
              style={{ backgroundColor: '#FF6600' }}
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Grade de receitas */}
        {receitas.length > 0 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {receitas.map((receita) => (
              <div
                key={receita.id}
                className="flex items-center justify-between rounded-xl px-6 py-4 text-white"
                style={{ backgroundColor: '#FF6600' }}
              >
                <div className="flex-1 text-center">
                  <p className="font-bold text-base">{receita.nome}</p>
                  <p className="text-sm mt-1">{receita.ingredientes}</p>
                  <p className="text-sm">{receita.tempo}</p>
                </div>
                <button
                  onClick={() => removerReceita(receita.id)}
                  className="ml-4 text-white hover:opacity-75 transition-opacity"
                  aria-label="Remover receita"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 6h18v2H3zm2 3h14l-1.5 12h-11zm5-6h4v2h-4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-8 py-4 text-center" style={{ backgroundColor: '#001830' }}>
        <p className="text-white text-xs tracking-widest">
          COPYRIGHT © 2025 – SERRA JUNIOR ENGENHARIA
        </p>
      </footer>
    </div>
  )
}
