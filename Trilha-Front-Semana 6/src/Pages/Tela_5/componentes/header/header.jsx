import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">

    <p>Lista de Filmes</p>
    <Link className="LinkMembros" to="/">Membros</Link>  
        
    </header>
  );
}

export default Header;