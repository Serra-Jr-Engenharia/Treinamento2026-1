import "./cardreceita.css";
import lixo from "./Vector.png";

interface CardReceitaProps {
  nome: string;
  ingredientes: string;
  tempo: string;
  excluir: () => void;
}

function Cardreceita({ nome, ingredientes, tempo, excluir }: CardReceitaProps) {
  return (
    <div className="Card">
      <div className="Conteudo">
        <ul className="Lista">
          <li className="Receita">{nome}</li>
          <li className="Ingredientes">{ingredientes}</li>
          <li className="Tempo">{tempo}</li>
        </ul>
      <img onClick={excluir}    className="Lixo" src={lixo} alt="lixo" />
      </div>
    </div>
  );
}

export default Cardreceita;
