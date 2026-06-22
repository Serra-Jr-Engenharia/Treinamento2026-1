import "./pesquisa.css";

function Pesquisa({ busca, setBusca, pesquisarFilmes }) {
  return (
    <div>
      <div className="pesquisar">
        <form action="" className="formulario">
          <input
            type="text"
            id="barrapesquisa"
            value={busca}
            placeholder="Nome do filme..."
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="button" id="botao" onClick={pesquisarFilmes}>
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pesquisa;
