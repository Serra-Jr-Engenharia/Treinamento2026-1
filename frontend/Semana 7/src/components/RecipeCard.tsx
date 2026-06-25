import type { Recipe } from '../types/Recipe'

interface Props {
  recipe: Recipe
  onDelete: (id: number) => void
}

function RecipeCard({ recipe, onDelete }: Props) {
  return (
    <div className="recipe-card">
      <h3>{recipe.nome}</h3>

      <p>{recipe.ingredientes}</p>

      <span>{recipe.tempoPreparo}</span>

      <button
        className="delete-btn"
        onClick={() => onDelete(recipe.id)}
      >
        🗑️
      </button>
    </div>
  )
}

export default RecipeCard