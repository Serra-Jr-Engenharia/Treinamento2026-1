import type { Recipe } from '../types/Recipe'
import RecipeCard from './RecipeCard'

interface Props {
  recipes: Recipe[]
  onDelete: (id: number) => void
}

function RecipeList({ recipes, onDelete }: Props) {
  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default RecipeList