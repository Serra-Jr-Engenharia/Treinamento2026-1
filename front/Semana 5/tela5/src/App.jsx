import Card from './components/Card';
import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [filmes, setFilmes] = useState([]);

  function pesquisar() {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=defc3936`;

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.Response === 'True') {
          const detalhes = json.Search.map((filme) =>
            fetch(`https://www.omdbapi.com/?apikey=defc3936&i=${filme.imdbID}`)
              .then((r) => r.json())
          );

          Promise.all(detalhes).then((filmesCompletos) => {
            setFilmes(filmesCompletos);
          });
        }
      });
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <header className="bg-primary h-[97px] pl-6 md:pl-[117px] flex items-center">
        <h1 className="text-[36px] font-bold">Lista de Filmes</h1>
      </header>

      <main className="flex-1">
        <div className="flex mt-[48px] gap-[20px] justify-center">
          <input
            type="text"
            placeholder="Nome do filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-[2px] border-secondary rounded-full text-base outline-none w-full max-w-[997px] h-[48px] 
            pl-[15px] placeholder:text-[#9b9b9b] placeholder:font-medium text-black"
          />

          <button 
            className="bg-secondary text-white font-medium rounded-full h-[48px] w-[266px] text-[24px] transition-all duration-200 
            hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90"
            onClick={pesquisar}>
            Pesquisar
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[26px] max-w-6xl mt-[54px] mx-auto">
          {filmes.map((filme) => (
            <Card
              key={filme.imdbID}
              poster={filme.Poster}
              titulo={filme.Title}
              ano={filme.Year}
              genero={filme.Genre}
            />
          ))}
        </div>

      </main>

      <footer className="bg-primary flex justify-center items-center text-[16px] h-[83px] font-medium">
        <p>COPYRIGHT Ⓒ 2025 - SERRA JUNIOR ENGENHARIA</p>
      </footer>
    </div>
  );
}

export default App;
