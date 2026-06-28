import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import CardReceita from './components/CardReceita';
import ModalConfirmacao from './components/ModalConfirmacao'; // Importamos o Modal

type ReceitaId = string;

interface Receita {
  id: ReceitaId; 
  nome: string;
  ingredientes: string;
  tempo: string;
}

type DadosNovaReceita = Omit<Receita, 'id'>;

function App() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  
  // Novos estados para o Modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [receitaParaExcluir, setReceitaParaExcluir] = useState<ReceitaId | null>(null);

  const adicionarNovaReceita = (dados: DadosNovaReceita): void => {
    const novaReceita: Receita = {
      id: Date.now().toString(),
      nome: dados.nome,
      ingredientes: dados.ingredientes,
      tempo: dados.tempo
    };
    setReceitas([...receitas, novaReceita]);
  };

  // 1. Quando clicar na lixeira do Card, preparamos a exclusão e abrimos o modal
  const prepararExclusao = (idDaReceita: ReceitaId): void => {
    setReceitaParaExcluir(idDaReceita);
    setIsModalOpen(true);
  };

  // 2. Se clicar em "Cancelar" no modal
  const cancelarExclusao = (): void => {
    setIsModalOpen(false);
    setReceitaParaExcluir(null);
  };

  // 3. Se clicar em "Sim" no modal, deletamos de fato
  const confirmarExclusao = (): void => {
    if (receitaParaExcluir) {
      const novaLista: Receita[] = receitas.filter((receita) => receita.id !== receitaParaExcluir);
      setReceitas(novaLista);
    }
    // Fecha o modal e limpa a seleção após excluir
    setIsModalOpen(false);
    setReceitaParaExcluir(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Header />
      <main className="grow flex flex-col items-center w-full pb-12">
        <Formulario onAdicionar={adicionarNovaReceita} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-380 px-4 justify-items-center">
          {receitas.map((receita: Receita) => (
            <CardReceita 
              key={receita.id}
              id={receita.id}
              nome={receita.nome}
              ingredientes={receita.ingredientes}
              tempo={receita.tempo}
              onExcluir={prepararExclusao} // Passamos a função que apenas ABRE o modal
            />
          ))}
        </div>
      </main>
      <Footer />

      {/* Renderizamos o Modal por cima de tudo */}
      <ModalConfirmacao 
        isOpen={isModalOpen}
        onClose={cancelarExclusao}
        onConfirm={confirmarExclusao}
      />
    </div>
  )
}

export default App;