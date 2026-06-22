import "./cards.css";



function Cards({ membro }) {
  return (
    <div className="card">
      <div className="BoxTop">
        <p>{membro}</p>
      </div>

      <div className="BoxBotton">
        <ul>
          <li>Nome</li>
          <li>Idade</li>
          <li>Curso</li>
        </ul>
      </div>
    </div>
  );
}

export default Cards;
