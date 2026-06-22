import Cards from "./Componentes/Cards/cards.jsx";
import Footer from "./Componentes/Footer/Footer.jsx";
import Header from "./Componentes/Header/Header.jsx";
import "./Tela4.css";
import { Link } from "react-router-dom";

function Tela4() {
  return (
    <div className="App">
      <Header />

      <main className="Cards">
        <Cards membro="Membro 1" />
        <Cards membro="Membro 2" />
        <Cards membro="Membro 3" />
      </main>

      <Footer />
    </div>
  );
}

export default Tela4;
