import { useState } from 'react'

interface Props {
  onAdd: (
    nome: string,
    ingredientes: string,
    tempoPreparo: string
  ) => void
}

function RecipeForm({ onAdd }: Props) {
  const [nome, setNome] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [tempoPreparo, setTempoPreparo] = useState('')

  function handleSubmit() {
    if (
      !nome.trim() ||
      !ingredientes.trim() ||
      !tempoPreparo.trim()
    ) {
      return
    }

    onAdd(nome, ingredientes, tempoPreparo)

    setNome('')
    setIngredientes('')
    setTempoPreparo('')
  }

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Nome da Receita"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="Ingredientes"
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tempo de Preparo"
        value={tempoPreparo}
        onChange={(e) => setTempoPreparo(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Adicionar
      </button>
    </div>
  )
}

export default RecipeForm