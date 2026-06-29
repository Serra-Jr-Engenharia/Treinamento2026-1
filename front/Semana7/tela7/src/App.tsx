import { useState } from 'react';
import Card from './components/Card';
import { motion } from "framer-motion"; 

interface ReceitasProps{
    id: number;
    receita:string;
    ingredientes:string;
    tempo:number;
  }

const inputClass = "border-[2px] border-secondary rounded-full text-base outline-none w-full max-w-[1153px] h-[48px] pl-[15px] placeholder:text-[#9b9b9b] placeholder:font-medium text-black";

function App(){
  const[receita,setReceita] = useState("");
  const[ingredientes,setIngredientes] = useState("");
  const[tempo,setTempo] = useState("");
  const [lista, setLista] = useState<ReceitasProps[]>([]);
  
  function Add(){
    if (!receita||!ingredientes||isNaN(Number(tempo))|| !tempo) return;

    const nova: ReceitasProps={
      id: Date.now(),
      receita,
      ingredientes,
      tempo: Number(tempo),
    };

    setLista([...lista, nova]);

    setReceita('');
    setIngredientes('');
    setTempo('');

  }

  function Delete(id: number) {
    setLista(lista.filter((item) => item.id !== id));
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <header className="bg-primary h-[97px] pl-6 md:pl-[117px] flex items-center">
        <h1 className="text-[36px] font-bold">Lista de Receitas</h1>
      </header>

      <main className="flex flex-col items-center gap-[20px] mt-[32px]">
        <input
          type="text" 
          placeholder="Nome da Receita" 
          value={receita}
          onChange={(e) => setReceita(e.target.value)}
          className={inputClass}
        />

        <input 
          type="text" 
          placeholder="Ingredientes" 
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          className={inputClass}
        />

        <input 
          type="text" 
          placeholder="Tempo de Preparo(Min)" 
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
          className={inputClass}
        />

        <motion.button onClick={Add} className="h-[48px] w-[266px] bg-secondary text-white font-medium rounded-full text-[24px]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Adicionar
        </motion.button>

        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mt-4">
          {lista.map((item)=>
            <Card
              key={item.id}
              receita={item.receita}
              ingredientes={item.ingredientes}
              tempo={item.tempo}
              onDelete={() => Delete(item.id)} 
            />   
          )}
        </div>
        
      </main>



      <footer className="bg-primary flex justify-center items-center text-[16px] h-[83px] font-medium mt-auto">
        <p>COPYRIGHT Ⓒ 2025 - SERRA JUNIOR ENGENHARIA</p>
      </footer>
    </div>
  );
}

export default App;
