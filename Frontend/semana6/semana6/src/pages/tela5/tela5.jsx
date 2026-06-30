import { useState } from "react";

import Header from "./Header";
import SearchBar from "./SearchBar";
import MovieGrid from "./MovieGrid";
import Footer from "./Footer";

import { searchMovies } from "./services/omdbApi";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSearch() {
    if (!searchTerm.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(searchTerm);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("Nenhum filme encontrado");
      }
    } catch (error) {
      console.error(error);

      setMovies([]);
      setError("Erro ao buscar filmes");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#EAEAEA]">
      <Header />

    <main className="flex-1 w-full py-8">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        {loading && (
          <p className="text-center text-lg">
            Carregando...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-red-500 text-lg">
            {error}
          </p>
        )}

        {!loading && movies.length > 0 && (
          <MovieGrid movies={movies} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;