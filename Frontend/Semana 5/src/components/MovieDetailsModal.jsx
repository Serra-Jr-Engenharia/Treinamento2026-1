import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"

function MovieDetailsModal({ id, onClose, avaliacoes, onAvaliar }) {
    const [movieDetails, setMovieDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [stars, setStars] = useState(avaliacoes[id]?.rating || 0)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://www.omdbapi.com/?apikey=b98cb95e&i=${id}&plot=full`)
                const data = await response.json()
                if (data.Response === "True") {
                    setMovieDetails(data)
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchDetails()
    }, [id])

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row p-6 gap-6">
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all cursor-pointer z-10"
                >
                    <X size={20} />
                </button>

                {loading ? (
                    <div className="flex-1 flex justify-center items-center h-64 font-bold text-secondary">
                        Carregando detalhes...
                    </div>
                ) : movieDetails ? (
                    <>
                        <div className="w-full md:w-1/3 aspect-2/3 bg-slate-200 rounded-2xl overflow-hidden shrink-0 shadow-md hidden md:block">
                            {movieDetails.Poster && movieDetails.Poster !== "N/A" ? (
                                <img src={movieDetails.Poster} alt={movieDetails.Title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">Sem Foto</div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between overflow-hidden pr-2">
                            <div className="overflow-y-auto flex-1 flex flex-col gap-3 max-h-[50vh] pb-4">
                                <div>
                                    <h2 className="text-2xl font-black text-primary leading-tight pr-8">{movieDetails.Title}</h2>
                                    <p className="text-sm text-slate-500 font-medium">{movieDetails.Year} • {movieDetails.Runtime}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {movieDetails.Genre?.split(", ").map((genre) => (
                                        <span key={genre} className="bg-secondary/10 text-secondary font-bold text-xs px-3 py-1 rounded-full">
                                            {genre}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 w-fit px-3 py-1 rounded-xl">
                                    <Star size={16} fill="currentColor" />
                                    <span className="font-bold text-sm">IMDb: {movieDetails.imdbRating} / 10</span>
                                </div>

                                <div>
                                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Sinopse</h4>
                                    <p className="text-slate-700 text-sm leading-relaxed text-justify">{movieDetails.Plot}</p>
                                </div>

                                <div className="text-xs text-slate-600 flex flex-col gap-1 border-t border-slate-100 pt-2">
                                    <p><strong>Elenco:</strong> {movieDetails.Actors}</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4 mt-2 bg-white flex flex-col gap-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sua Avaliação</span>
                                <div className="flex gap-2 text-amber-400 cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <span 
                                            key={num} 
                                            onClick={() => {
                                                setStars(num);
                                                onAvaliar(id, {
                                                    Title: movieDetails.Title,
                                                    Poster: movieDetails.Poster,
                                                    Year: movieDetails.Year,
                                                    rating: num
                                                });
                                            }}
                                            className="text-3xl transition-all hover:scale-125 select-none"
                                        >
                                            {num <= stars ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 text-center py-8">Erro ao carregar os dados.</div>
                )}
            </div>
        </div>
    )
}

export default MovieDetailsModal