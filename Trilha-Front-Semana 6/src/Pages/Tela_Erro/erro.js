import "./erro.css";
import { Link } from "react-router-dom";

function Erro() {
  return (
    <div className="erro">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default Erro;