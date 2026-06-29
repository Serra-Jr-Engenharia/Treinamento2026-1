import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecipeCard } from './components/RecipeCard';
import type { Recipe } from './types';

const SUGGESTED_RECIPES = [
  { name: 'Miojo', ingredients: 'Macarrão instantâneo, tempero e água', prepTime: '15 Minutos' },
  { name: 'Arroz', ingredients: 'Arroz, alho, sal, água', prepTime: '20 Minutos' },
  { name: 'Feijoada', ingredients: 'Feijão, alho, sal, linguiça, bacon, água', prepTime: '30 Minutos' },
  { name: 'Filé de boi', ingredients: 'Filé de boi, óleo, sal, alho, tempero', prepTime: '10 Minutos' },
  { name: 'Pipoca', ingredients: 'Milho de pipoca, óleo, sal', prepTime: '5 Minutos' },
  { name: 'Brigadeiro', ingredients: 'Leite condensado, chocolate em pó, manteiga', prepTime: '15 Minutos' },
  { name: 'Panqueca', ingredients: 'Farinha, leite, ovos, sal', prepTime: '20 Minutos' },
  { name: 'Omelete', ingredients: 'Ovos, sal, pimenta, cheiro verde', prepTime: '10 Minutos' },
  { name: 'Salada de Frutas', ingredients: 'Maçã, banana, mamão, mel', prepTime: '15 Minutos' },
  { name: 'Bolo de Cenoura', ingredients: 'Cenoura, ovos, farinha, açúcar, óleo, fermento', prepTime: '45 Minutos' },
  { name: 'Tapioca', ingredients: 'Goma de tapioca, sal', prepTime: '5 Minutos' },
  { name: 'Sanduíche Natural', ingredients: 'Pão integral, frango desfiado, maionese, alface', prepTime: '10 Minutos' },
  { name: 'Suco de Laranja', ingredients: 'Laranja, água, gelo', prepTime: '5 Minutos' },
  { name: 'Macarrão à Bolonhesa', ingredients: 'Macarrão, carne moída, molho de tomate', prepTime: '30 Minutos' },
];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [prepTime, setPrepTime] = useState<string>('');

  const suggestion = useMemo(() => {
    if (!name) return null;
    return SUGGESTED_RECIPES.find((r) => r.name.toLowerCase() === name.toLowerCase()) || null;
  }, [name]);

  const applySuggestion = () => {
    if (suggestion) {
      setIngredients(suggestion.ingredients);
      setPrepTime(suggestion.prepTime);
    }
  };

  const handleAddRecipe = () => {
    if (!name.trim() || !ingredients.trim() || !prepTime.trim()) return;

    const newRecipe: Recipe = {
      id: uuidv4(),
      name,
      ingredients,
      prepTime
    };
    setRecipes([...recipes, newRecipe]);
    setName('');
    setIngredients('');
    setPrepTime('');
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 flex flex-col items-center pt-12 pb-16 w-full max-w-[1366px] mx-auto">
        <div className="w-[1153px] flex flex-col gap-[13px]">
          <input
            type="text"
            placeholder="Nome da Receita"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[55px] rounded-[22px] border-2 border-[#FF6600] px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          />

          {suggestion && (
            <div className="w-full bg-[#fdf2e9] border border-[#FF6600] rounded-[22px] px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-[#FF6600]">Sugestão encontrada:</p>
                <p className="text-sm text-gray-600">{suggestion.ingredients} • {suggestion.prepTime}</p>
              </div>
              <button 
                onClick={applySuggestion}
                className="bg-[#FF6600] text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600"
              >
                OK
              </button>
            </div>
          )}

          <input
            type="text"
            placeholder="Ingredientes"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full h-[55px] rounded-[22px] border-2 border-[#FF6600] px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          />
          <input
            type="text"
            placeholder="Tempo de Preparo"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="w-full h-[55px] rounded-[22px] border-2 border-[#FF6600] px-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
          />
        </div>

        <button
          onClick={handleAddRecipe}
          className="w-[266px] h-[48px] bg-[#FF6600] text-white font-bold text-lg rounded-[22px] mt-8 hover:bg-orange-600 transition-colors shadow-md cursor-pointer"
        >
          Adicionar
        </button>

        <div className="w-[1153px] mt-12 flex flex-wrap gap-x-8 gap-y-6 justify-center">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDeleteRecipe}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}