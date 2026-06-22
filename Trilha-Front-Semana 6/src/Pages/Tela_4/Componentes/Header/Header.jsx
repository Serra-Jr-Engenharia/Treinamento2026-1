import "./Header.css";
import logoserra from "./Logo SerraJr 1.png"
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="titulo">
        <img id="logoserra" src={logoserra} alt="Logo Serra" />
        <p className="EquipeSerraJr">Equipe Serra Jr</p>
        <Link className="LinkFilmes" to="/Tela5">Filmes</Link>  
      </div>
    </header>
  );
}

export default Header;
