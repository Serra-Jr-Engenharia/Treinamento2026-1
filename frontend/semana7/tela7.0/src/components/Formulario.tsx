import { useState } from 'react';
import { InputPersonalizado } from './InputPersonalizado';

interface FormularioProps {
  onAdicionar: (novaReceita: { nome: string; ingredientes: string; tempo: string }) => void;
}

export default function Formulario({ onAdicionar }: FormularioProps) {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [tempo, setTempo] = useState('');
  const [erro, setErro] = useState('');

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !ingredientes.trim() || !tempo.trim()) {
      setErro('Por favor, preencha todos os campos da receita!');
      return; 
    }

    setErro('');

    onAdicionar({ nome, ingredientes, tempo });

    setNome('');
    setIngredientes('');
    setTempo('');
  };

  return (
    <form onSubmit={handleAdicionar} className="flex flex-col items-center w-full px-4 mt-8 mb-16 gap-8">
      <div className="flex flex-col w-full max-w-400 gap-2">
        <InputPersonalizado id="nome" label="Nome da Receita" value={nome} onChange={(e) => setNome(e.target.value)} />
        <InputPersonalizado id="ingredientes" label="Ingredientes" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
        <InputPersonalizado id="tempo" label="Tempo de Preparo" value={tempo} onChange={(e) => setTempo(e.target.value)} />
      </div>

      {erro && (
        <p className="text-red-500 font-medium text-center bg-red-100 px-4 py-2 rounded-lg">
          {erro}
        </p>
      )}

      <button
        type="submit"
        className="w-66.5 h-12 rounded-[22px] bg-[#ff6600] text-white hover:bg-[#e65c00] transition-colors font-medium text-[24px] leading-none text-center"
      >
        Adicionar
      </button>
    </form>
  )
}