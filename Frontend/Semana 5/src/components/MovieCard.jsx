function MovieCard({ name, year, imgUrl, onClick }) {
    return (
        <div onClick={onClick} className="flex flex-col bg-secondary rounded-3xl text-center items-center p-4 gap-2 text-white w-full max-w-55 min-h-90 shadow-lg justify-center">
            <div className="w-full aspect-2/3 bg-[#D9D9D9] rounded-2xl overflow-hidden flex items-center justify-center text-slate-500 font-medium">
                {imgUrl && imgUrl !== "N/A" ? (
                    <img 
                        src={imgUrl} 
                        alt={name} 
                        className="w-full h-full object-cover object-center" 
                    />
                ) : (
                    <span className="text-xs text-slate-400">Sem Pôster</span>
                )}  
            </div>
            
            <div className="flex flex-col justify-between flex-1 w-full mt-1">
                <p className="font-bold text-[18px] leading-tight line-clamp-2 px-1" title={name}>
                    {name}
                </p>
                <p className="text-sm text-white/80 font-medium mt-1">{year}</p>
            </div>

        </div>
    )
}

export default MovieCard