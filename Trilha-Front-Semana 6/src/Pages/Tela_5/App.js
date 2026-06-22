import React, { useState, useEffect } from "react";
import Cards from "./componentes/cards/cards";
import Footer from "./componentes/footer/footer";
import Header from "./componentes/header/header";
import Pesquisa from "./componentes/pesquisa/pesquisa";
import "./index.css";

function Tela5() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");

  function pesquisarFilmes() {
    fetch(`https://www.omdbapi.com/?s=${busca}&apikey=1a78936e`)
      .then((r) => r.json())
      .then((dados) => {
        setFilmes(dados.Search || []);
      });
  }

  useEffect(() => {
    pesquisarFilmes();
  }, []);

  return (
    <div className="body">
      <Header />

      <main>
        <Pesquisa
          busca={busca}
          setBusca={setBusca}
          pesquisarFilmes={pesquisarFilmes}
        />

        <div className="Cards">
          {filmes.slice(0, 5).map((filme) => (
            <Cards
              key={filme.imdbID}
              titulo={filme.Title}
              ano={filme.Year}
              poster={filme.Poster}
            />
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Tela5;
