import Moldure from '../../components/Moldure';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const MotionLink = motion(Link);

function App() {
  const [query, setQuery] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    if (!termoBusca) return;

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${termoBusca}&apikey=${apiKey}`;

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.Response === 'True') {
          const detalhes = json.Search.map((filme) =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${filme.imdbID}`)
              .then((r) => r.json())
          );

          Promise.all(detalhes).then((filmesCompletos) => {
            setFilmes(filmesCompletos);
          });
        }
      });

  }, [termoBusca]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <header className="bg-secondary h-[97px] pl-6 md:pl-[117px] flex items-center">
        <h1 className="text-[36px] font-bold">Lista de Filmes</h1>
      </header>

      <main className="flex-1">
        <div className="flex mt-[48px] gap-[20px] justify-center">
          <input
            type="text"
            placeholder="Nome do filme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-[2px] border-primary rounded-full text-base outline-none w-full max-w-[997px] h-[48px] 
            pl-[15px] placeholder:text-[#9b9b9b] placeholder:font-medium text-black"
          />

          <button
            className="bg-primary text-white font-medium rounded-full h-[48px] w-[266px] text-[24px] transition-all duration-200 
            hover:brightness-110 hover:scale-105 active:scale-95 active:brightness-90"
            onClick={() => setTermoBusca(query)}>
            Pesquisar
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[26px] max-w-6xl mt-[54px] mx-auto mb-[60px]">
          {filmes.map((filme) => (
            <Moldure
              key={filme.imdbID}
              poster={filme.Poster}
              titulo={filme.Title}
              ano={filme.Year}
              genero={filme.Genre}
            />
          ))}
        </div>
      </main>

      <footer className="bg-secondary relative flex justify-center items-center text-[16px] h-[83px] font-medium">
        <p>COPYRIGHT Ⓒ 2025 - SERRA JUNIOR ENGENHARIA</p>
        <MotionLink
          to="/equipe"
          className="absolute right-[23px] bg-primary w-[187px] h-[64px] rounded-[22px] flex items-center justify-center font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Equipe
        </MotionLink>
      </footer>

    </div>
  );
}

export default App;