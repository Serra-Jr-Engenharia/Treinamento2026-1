import ReturnButton from "../../../Semana 6/src/components/ReturnButton"

function Header() {
    return (
        <header className="flex bg-primary h-24 items-center w-full">
            <p className="text-white font-bold text-2xl px-6 sm:text-4xl sm:px-32 transition-all">Lista de Filmes</p>
            <ReturnButton/>
        </header>
    )
}

export default Header