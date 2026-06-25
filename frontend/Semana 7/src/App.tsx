import { useState } from 'react'

import Header from './components/Header'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'
import Footer from './components/Footer'

import type { Recipe } from './types/Recipe'

import './App.css'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      nome: 'Miojo',
      ingredientes: 'Macarrão instantâneo, tempero e água',
      tempoPreparo: '15 Minutos',
    },
    {
      id: 2,
      nome: 'Arroz',
      ingredientes: 'Arroz, alho, sal e água',
      tempoPreparo: '20 Minutos',
    },
  ])

  function addRecipe(
    nome: string,
    ingredientes: string,
    tempoPreparo: string
  ) {
    const newRecipe: Recipe = {
      id: Date.now(),
      nome,
      ingredientes,
      tempoPreparo,
    }

    setRecipes([...recipes, newRecipe])
  }

  function deleteRecipe(id: number) {
    setRecipes(
      recipes.filter((recipe) => recipe.id !== id)
    )
  }

  return (
    <div className="page">
      <div className="container">
        <Header />

        <main>
          <RecipeForm onAdd={addRecipe} />

          <RecipeList
            recipes={recipes}
            onDelete={deleteRecipe}
          />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App