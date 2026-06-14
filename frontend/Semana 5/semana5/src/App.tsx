import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre?: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

interface MovieDetail {
  Genre: string;
  Response: string;
}

const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchGenre = async (imdbID: string): Promise<string | undefined> => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`,
      );
      const data: MovieDetail = await res.json();
      return data.Response === "True" && data.Genre !== "N/A"
        ? data.Genre
        : undefined;
    } catch {
      return undefined;
    }
  };

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query.trim())}`,
      );
      const data: SearchResponse = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);

        const genres = await Promise.all(
          data.Search.map((m) => fetchGenre(m.imdbID)),
        );
        setMovies(data.Search.map((m, i) => ({ ...m, Genre: genres[i] })));
      } else {
        setMovies([]);
        setError(data.Error ?? "Nenhum filme encontrado.");
      }
    } catch {
      setMovies([]);
      setError(
        "Erro ao buscar filmes. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="px-8 py-5" style={{ backgroundColor: "#001830" }}>
        <h1 className="text-white text-3xl font-bold">Lista de Filmes</h1>
      </header>

      <main className="flex-1 px-8 py-8">
        <SearchBar query={query} setQuery={setQuery} onSearch={searchMovies} />

        {loading && (
          <p className="text-center mt-12 text-gray-500 text-lg">
            Buscando filmes...
          </p>
        )}

        {!loading && error && (
          <p className="text-center mt-12 text-red-500 text-lg">{error}</p>
        )}

        {!loading && movies.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {!loading && searched && movies.length === 0 && !error && (
          <p className="text-center mt-12 text-gray-500 text-lg">
            Nenhum resultado encontrado.
          </p>
        )}
      </main>

      <footer
        className="py-4 text-center"
        style={{ backgroundColor: "#001830" }}
      >
        <p className="text-white text-sm tracking-widest">
          COPYRIGHT © 2025 - SERRA JUNIOR ENGENHARIA
        </p>
      </footer>
    </div>
  );
}
