import "./pesquisa.css";

interface PesquisaProps {
  placeholder: string;
  value:string;
  setValue: (valor: string) => void;
}


function Pesquisa({placeholder, value, setValue}: PesquisaProps) {
  
  
  
  return (
    <div>
      <div className="pesquisar">
        <form action="" className="formulario">
          <input           type="text"
          id="barrapesquisa"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}/>

        </form>
      </div>
    </div>
  );
}

export default Pesquisa;
