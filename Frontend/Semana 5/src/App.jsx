import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import MovieCard from "./components/MovieCard"
import Search from "./components/Search"
import MovieDetailsModal from "./components/MovieDetailsModal"

function App() {

    const [movies, setMovies] = useState([
        // { imdbID: 1, Title: "Avengers", Year: "2009", Poster: "" },
        // { imdbID: 2, Title: "The Avengers", Year: "2024", Poster: "" }
    ])

    const [currentFilter, setFilter] = useState("")
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [activeTab, setActiveTab] = useState("search")

    const [reviews, setReviews] = useState(() => {
        const save = localStorage.getItem("my-reviews")
        return save ? JSON.parse(save) : {}
    })

    const saveReview = (id, movieData) => {
        const newReview = {
            ...reviews,
            [id]: movieData
        }
        setReviews(newReview)
        localStorage.setItem("my-reviews", JSON.stringify(newReview))
    }

    const filterMovies = [...movies].sort((a, b) => {
        const yearA = parseInt(a.Year?.toString().substring(0, 4)) || 0;
        const yearB = parseInt(b.Year?.toString().substring(0, 4)) || 0;
        switch (currentFilter) {
            case "az":
                return a.Title.localeCompare(b.Title)
            case "za":
                return b.Title.localeCompare(a.Title)
            case "new":
                return yearB - yearA
            case "last":
                return yearA - yearB
            default:
                return 0
        }
    })

    const handleSearch = async (movieName) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=b98cb95e&s=${movieName}`)
            const data = await response.json()
            if (!data.Search) {
                alert("Nenhum Filme Encontrado")
            } else {
                setMovies(data.Search)
            }
        } catch (error) {
            console.error("Erro na busca:", error)
        }
    }
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 flex flex-col gap-6 p-8 max-w-7xl mx-auto w-full">

                <div className="flex justify-center gap-4 border-b border-slate-200 pb-4">
                    <button
                        onClick={() => setActiveTab("search")}
                        className={`px-6 py-2 rounded-3xl font-bold cursor-pointer transition-all ${activeTab === "search" ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                        Buscar Filmes
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-6 py-2 rounded-3xl font-bold cursor-pointer transition-all ${activeTab === "reviews" ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                        Minhas Avaliações ({Object.keys(reviews).length})
                    </button>
                </div>

                {activeTab === "search" ? (
                    <>
                        <Search onSearch={handleSearch} onFilterChange={setFilter} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full justify-items-center">
                            {filterMovies.map((movie) => (
                                <MovieCard key={movie.imdbID} name={movie.Title} year={movie.Year} imgUrl={movie.Poster} onClick={() => setSelectedMovie(movie.imdbID)} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full justify-items-center">
                        {Object.keys(reviews).length === 0 ? (
                            <p className="text-center col-span-full text-slate-400 font-medium py-8">Você ainda não avaliou nenhum filme.</p>
                        ) : (
                            Object.entries(reviews).map(([id, movie]) => (
                                <div key={id} className="relative group">
                                    <MovieCard name={movie.Title} year={movie.Year} imgUrl={movie.Poster} onClick={() => setSelectedMovie(id)} />
                                    <div className="absolute top-2 left-2 bg-amber-400 text-slate-900 font-black px-2.5 py-1 rounded-2xl text-xs shadow-md pointer-events-none">
                                        ★ {movie.rating}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
            <Footer />

            {selectedMovie && (//
                <MovieDetailsModal
                    id={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    avaliacoes={reviews}
                    onAvaliar={saveReview}
                />
            )}
        </div>
    )
}

export default App