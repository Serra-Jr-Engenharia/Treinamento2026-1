import "./cards.css";

function Cards({titulo,ano,poster}) {
  return (
    <div className="Cards">
      <div className="BoxFora">
        <div className="BoxCenter">
          <img src={poster} alt={titulo} />
        </div>
        <p className="tituloCard">{titulo}</p>
        <p className="ano">{ano}</p>
      </div>
    </div>
  );
}

export default Cards;
