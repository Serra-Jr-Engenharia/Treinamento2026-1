import { Trash2 } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

export function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <div className="w-[558px] min-h-[91px] bg-[#FF6600] rounded-[22px] flex flex-col justify-center relative p-4 shadow-md mt-4">
      <div className="text-center text-white pr-10">
        <h3 className="font-bold text-lg leading-tight">{recipe.name}</h3>
        <p className="text-sm my-1">{recipe.ingredients}</p>
        <p className="text-sm font-semibold">{recipe.prepTime}</p>
        
     
      </div>
      <button
        onClick={() => onDelete(recipe.id)}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-red-900 transition-colors cursor-pointer"
      >
        <Trash2 size={24} />
      </button>
    </div>
  );
}