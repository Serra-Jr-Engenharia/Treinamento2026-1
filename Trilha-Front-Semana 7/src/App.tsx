import "./App.css";
import Header from "./componentes/header/Header";
import Pesquisa from "./componentes/pesquisa/pesquisa";
import Footer from "./componentes/footer/footer";
import Cardreceita from "./componentes/cardreceita/cardreceita";

import { useState } from "react";

interface Card {
  nome: string;
  ingredientes: string;
  tempo: string;
}

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);

  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [tempo, setTempo] = useState("");

  function excluirCard(card: Card) {
    const removerCard = cards.filter((item) => item !== card);
    setCards(removerCard);
  }

  function criarCard() {
    if (cards.length >= 4) {
      return;
    }

    setCards((cards) => [
      ...cards,
      {
        nome: nome,
        ingredientes: ingredientes,
        tempo: tempo,
      },
    ]);

    setNome("");
    setIngredientes("");
    setTempo("");
  }

  return (
    <div>
      <Header />

      <div className="body">
        <Pesquisa
          placeholder="Nome da Receita"
          value={nome}
          setValue={setNome}
        />

        <Pesquisa
          placeholder="Ingredientes"
          value={ingredientes}
          setValue={setIngredientes}
        />

        <Pesquisa
          placeholder="Tempo de Preparo"
          value={tempo}
          setValue={setTempo}
        />
        <button onClick={criarCard} className="botao">
          Adicionar
        </button>

        <div className="AreaCards">
          {cards.map((card, index) => (
            <Cardreceita
              key={index}
              nome={card.nome}
              ingredientes={card.ingredientes}
              tempo={card.tempo}
              excluir={() => excluirCard(card)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
