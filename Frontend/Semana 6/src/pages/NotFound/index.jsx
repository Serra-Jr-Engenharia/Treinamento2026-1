import ReturnButton from "../../components/ReturnButton"

function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans text-center mb-12">
            <div className="font-black text-transparent mb-3 animate-fade-in">
                <h1 className="text-5xl bg-clip-text bg-gradient-to-r from-red-500 to-red-400 animate-bounce">404!</h1>
                <h1 className="text-3xl bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">OPS... Não encontramos a página que você busca!</h1>
            </div>
            <ReturnButton />
        </div>
    )
}

export default NotFound