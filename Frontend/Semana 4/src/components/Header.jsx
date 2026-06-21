import logo from "../assets/LogoSerraJr.svg"
import ReturnButton from "../../../Semana 6/src/components/ReturnButton"

function Header() {
    return (
        <header className="flex items-center bg-secondary h-24 p-5 text-white font-sans">
            <div className="flex items-center gap-4">
                <img src={logo} alt="Logo Serra" className="h-14 w-14 object-contain"></img>
                <h1 className="text-2xl font-bold">Equipe Serra Jr</h1>
                <ReturnButton/>
            </div>
        </header>
    )
}

export default Header   